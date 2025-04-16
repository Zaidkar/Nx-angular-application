import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IGameEvent, UserRole } from '@avans-nx-workshop/shared/api';
import { GameEventService } from '../../../../../../libs/frontend/features/src/index';
import { AuthService } from '../../../../../../libs/frontend/features/src/lib/auth/auth.service';

@Component({
    selector: 'avans-nx-workshop-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    events: IGameEvent[] = [];
    currentUser: any;

    constructor(
        private gameEventService: GameEventService,
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.authService.getUserFromLocalStorage().subscribe({
            next: (user) => {
                this.currentUser = user;
                console.log('loaded user:', this.currentUser);
                this.loadEvents();
            },
            error: (err) => console.error('could not load user', err)
        });
    }

    loadEvents(): void {
        this.gameEventService.findAll().subscribe({
            next: (events) => (this.events = events),
            error: (err) => console.error('Error fetching events', err)
        });
    }

    isParticipating(event: IGameEvent): boolean {
        if (!this.currentUser || !event.participants) return false;
        return event.participants.some((participant) =>
            typeof participant === 'string'
                ? participant === this.currentUser._id
                : participant._id === this.currentUser._id
        );
    }

    joinEvent(event: IGameEvent): void {
        if (!this.currentUser) return;
        this.gameEventService
            .joinEvent(event._id, this.currentUser._id)
            .subscribe({
                next: () => this.loadEvents(),
                error: (err) => console.error('Error joining event', err)
            });
    }

    leaveEvent(event: IGameEvent): void {
        if (!this.currentUser) return;
        this.gameEventService
            .leaveEvent(event._id, this.currentUser._id)
            .subscribe({
                next: () => this.loadEvents(),
                error: (err) => console.error('Error leaving event', err)
            });
    }

    viewEventDetails(event: IGameEvent): void {
        this.router.navigate(['/events', event._id]);
    }

    canEnterEvent(): boolean {
        return !!this.currentUser;
    }

    isAdmin(): boolean {
        return (
            this.currentUser?.role?.toLowerCase() ===
            UserRole.Admin.toLowerCase()
        );
    }

    redirectToAddEvent(): void {
        this.router.navigate(['/events/create']);
    }
}
