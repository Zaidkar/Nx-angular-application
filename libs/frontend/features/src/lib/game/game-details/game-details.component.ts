import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import {
    IGame,
    IReview,
    IUserIdentity,
    UserRole
} from '@avans-nx-workshop/shared/api';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'avans-nx-workshop-user-details',
    templateUrl: './game-details.component.html',
    styles: []
})
export class GameDetailsComponent implements OnInit, OnDestroy {
    gameId: string | null = null;
    game?: IGame;
    sub?: Subscription;
    currentUser?: IUserIdentity;

    newReview: Partial<IReview & { poster?: string }> = {
        title: '',
        description: '',
        poster: '',
        hoursPlayed: 0,
        score: 0
    };

    constructor(
        private gameService: GameService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.sub = this.route.paramMap.subscribe((params) => {
            this.gameId = params.get('id');
            this.gameService
                .getGameById(String(this.gameId))
                .subscribe((game) => (this.game = game));
        });

        const stored = localStorage.getItem('currentuser');
        if (stored) {
            this.currentUser = JSON.parse(stored);
        }
    }

    ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    isUserObject(value: any): value is IUserIdentity {
        return value && typeof value === 'object' && 'emailAddress' in value;
    }
    deleteGame(id: string): void {
        this.sub?.add(
            this.gameService.deleteGame(id).subscribe(() => {
                this.router.navigate(['..'], { relativeTo: this.route });
            })
        );
    }

    isAdmin(): boolean {
        return (
            this.currentUser?.role?.toLowerCase() ===
            UserRole.Admin.toLowerCase()
        );
    }

    isLoggedIn(): boolean {
        return !!this.currentUser;
    }

    submitReview(): void {
        if (!this.game?._id || !this.currentUser) return;

        const review: IReview = {
            ...this.newReview,
            title: this.newReview.title || '',
            description: this.newReview.description || '',
            hoursPlayed: this.newReview.hoursPlayed || 0,
            score: this.newReview.score || 0,
            poster: this.currentUser._id,
            postDate: new Date(),
            reviewer: this.currentUser._id
        };

        console.log('Review submitted:', review);

        this.gameService.addReview(this.game._id, review).subscribe({
            next: () => {
                this.gameService
                    .getGameById(String(this.gameId))
                    .subscribe((game) => {
                        this.game = game;
                    });

                this.newReview = {
                    title: '',
                    description: '',
                    hoursPlayed: 0,
                    score: 0
                };
            },
            error: (err: any) => {
                console.error('Failed to submit review', err);
            }
        });
    }

    canEditReview(review: IReview): boolean {
        return this.currentUser?._id === this.getReviewerId(review);
    }

    canDeleteReview(review: IReview): boolean {
        return this.canEditReview(review) || this.isAdmin();
    }

    getReviewerId(review: IReview): string {
        if (typeof review.reviewer === 'string') return review.reviewer;
        return review.reviewer?._id || '';
    }

    deleteReview(reviewId: string): void {
        if (!this.game?._id) return;

        // this.gameService.removeReview(this.game._id, reviewId).subscribe({
        //     next: () => {
        //         this.gameService
        //             .getGameById(String(this.gameId))
        //             .subscribe((game) => {
        //                 this.game = game;
        //             });
        //     },
        //     error: (err: any) => {
        //         console.error('Failed to delete review', err);
        //     }
        // });
    }
}
