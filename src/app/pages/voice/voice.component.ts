import { Component, NgZone } from '@angular/core';
import { ReminderService } from '../../services/reminder.service';

@Component({
  selector: 'app-voice',
  templateUrl: './voice.component.html',
  styleUrls: ['./voice.component.scss'],
})
export class VoiceComponent {
  recognition: any;
  transcript: string = '';
  response: string = '';
  listening: boolean = false;
  private vibrationInterval: any;

  constructor(
    private zone: NgZone,
    public reminderService: ReminderService,
  ) {
    const webkitSpeechRecognition = (window as any).webkitSpeechRecognition;

    if (webkitSpeechRecognition) {
      this.recognition = new webkitSpeechRecognition();
      this.recognition.lang = 'en-US';
      this.recognition.continuous = false;
      this.recognition.interimResults = false;

      this.recognition.onstart = () => {
        console.log('Voice recognition started');
        this.zone.run(() => {
          this.listening = true;
          // provide vibration feedback when listening starts
          if (navigator.vibrate) {
            navigator.vibrate(120);
            this.vibrationInterval = setInterval(() => {
              navigator.vibrate(120);
            }, 300);
          }
        });
      };

      this.recognition.onerror = (event: any) => {
        console.error('Voice recognition error:', event.error);
        this.zone.run(() => {
          this.listening = false;
          if (this.vibrationInterval) {
            clearInterval(this.vibrationInterval);
            this.vibrationInterval = null;
          }
        });
      };

      this.recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript;

        this.zone.run(() => {
          this.listening = false;
          if (this.vibrationInterval) {
            clearInterval(this.vibrationInterval);
            this.vibrationInterval = null;
          }
          this.transcript = text;
          this.generateResponse(text);
          // speak the response out loud for accessibility
          this.speakResponse();
        });
      };
    }
  }

  startListening() {
    if (this.recognition) {
      this.zone.run(() => {
        this.listening = true;
        if (navigator.vibrate) {
          navigator.vibrate(120);
          this.vibrationInterval = setInterval(() => {
            navigator.vibrate(120);
          }, 300);
        }
      });
      this.recognition.start();
    }
  }

  generateResponse(text: string) {
    const lower = text.toLowerCase();

    // detect a time like "3 pm", "3pm", "10 am"
    const timeMatch = lower.match(
      /(\d{1,2})(?::(\d{2}))?\s?(a\.?m\.?|p\.?m\.?|am|pm)/,
    );

    if (lower.includes('remind') || lower.includes('reminder')) {
      if (timeMatch) {
        const hour = timeMatch[1];
        const minutes = timeMatch[2] || '00';
        const period = timeMatch[3].replace(/\./g, '').toUpperCase();

        const timeString = `${hour}:${minutes} ${period}`;

        this.reminderService.addReminder({
          text: text,
          time: timeString,
          createdAt: new Date(),
        });

        this.response = `Reminder set for ${timeString}.`;
      } else {
        this.response = 'Reminder noted, but I could not detect the time.';
      }
    } else {
      this.response = 'Sorry, I did not understand the request.';
    }
  }

  speakResponse() {
    if ('speechSynthesis' in window && this.response) {
      const utterance = new SpeechSynthesisUtterance(this.response);
      utterance.lang = 'en-US';
      utterance.rate = 0.9; // slightly slower for clarity
      window.speechSynthesis.speak(utterance);
    }
  }
}
