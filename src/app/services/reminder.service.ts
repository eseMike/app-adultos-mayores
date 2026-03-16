import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReminderService {
  private reminders: any[] = JSON.parse(
    localStorage.getItem('reminders') || '[]',
  );

  constructor() {
    this.startReminderWatcher();
  }

  addReminder(reminder: { text: string; time: string; createdAt: Date }) {
    this.reminders.push(reminder);
    localStorage.setItem('reminders', JSON.stringify(this.reminders));
  }

  getReminders() {
    return this.reminders;
  }

  clearReminders() {
    this.reminders = [];
    localStorage.removeItem('reminders');
  }

  private startReminderWatcher() {
    setInterval(() => {
      const now = new Date();

      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();

      this.reminders.forEach((reminder) => {
        const parsed = this.parseReminderTime(reminder.time);
        if (!parsed) return;

        if (
          parsed.hours === currentHours &&
          parsed.minutes === currentMinutes
        ) {
          alert(`Reminder: ${reminder.text}`);
        }
      });
    }, 60000);
  }

  private parseReminderTime(
    time: string,
  ): { hours: number; minutes: number } | null {
    const match = time.match(/(\d{1,2}):(\d{2})\s?(AM|PM)/i);
    if (!match) return null;

    let hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    const period = match[3].toUpperCase();

    if (period === 'PM' && hours < 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;

    return { hours, minutes };
  }
}
