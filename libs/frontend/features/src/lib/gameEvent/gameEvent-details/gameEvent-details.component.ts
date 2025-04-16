import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IGameEvent, UserRole } from '@avans-nx-workshop/shared/api';
import { GameEventService } from '../gameEvent.service';
import { AuthService } from '../../../../../../../libs/frontend/features/src/lib/auth/auth.service';

@Component({
    selector: 'app-game-event-details',
    templateUrl: './gameEvent-details.component.html',
    styleUrls: []
})
export class GameEventDetailsComponent implements OnInit, OnDestroy {
    eventId: string | null = null;
    gameEvent?: IGameEvent;
    currentUser: any;
    sub?: Subscription;

    constructor(
        private eventService: GameEventService,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService
    ) {}

    isStringParticipant(p: any): boolean {
        return typeof p === 'string';
    }

    ngOnInit(): void {
        this.sub = this.authService.getUserFromLocalStorage().subscribe({
            next: (user) => {
                this.currentUser = user;
                console.log('loaded current user:', this.currentUser);
            },
            error: (err) => console.error('Error loading user', err)
        });
        this.route.paramMap.subscribe((params) => {
            this.eventId = params.get('id');
            if (this.eventId) {
                this.loadEvent(this.eventId);
            }
        });
    }

    ngOnDestroy(): void {
        this.sub?.unsubscribe();
    }

    private loadEvent(id: string): void {
        this.eventService.getEventById(id).subscribe({
            next: (evt: IGameEvent | undefined) => (this.gameEvent = evt),
            error: (err: any) => console.error('Error loading event', err)
        });
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

    isParticipating(): boolean {
        if (!this.currentUser || !this.gameEvent?.participants) return false;
        return this.gameEvent.participants.some((p) =>
            typeof p === 'string'
                ? p === this.currentUser._id
                : p._id === this.currentUser._id
        );
    }

    joinEvent(): void {
        if (!this.currentUser || !this.eventId) return;
        this.eventService
            .joinEvent(this.eventId, this.currentUser._id)
            .subscribe({
                next: () => this.loadEvent(this.eventId!),
                error: (err: any) => console.error('Error joining event', err)
            });
    }

    leaveEvent(): void {
        if (!this.currentUser || !this.eventId) return;
        this.eventService
            .leaveEvent(this.eventId, this.currentUser._id)
            .subscribe({
                next: () => this.loadEvent(this.eventId!),
                error: (err: any) => console.error('Error leaving event', err)
            });
    }

    editEvent(): void {
        if (!this.eventId) return;
        this.router.navigate(['/events', this.eventId, 'edit']);
    }

    deleteEvent(): void {
        if (!this.eventId) return;
        this.eventService.deleteEvent(this.eventId).subscribe({
            next: () => this.router.navigate(['/dashboard']),
            error: (err: any) => console.error('Error deleting event', err)
        });
    }
}
