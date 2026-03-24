import { Component, NgZone, OnInit } from '@angular/core';
import { ReminderService } from '../../services/reminder.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-voice',
  templateUrl: './voice.component.html',
  styleUrls: ['./voice.component.scss'],
})
export class VoiceComponent implements OnInit {
  recognition: any;
  transcript: string = '';
  response: string = '';
  listening: boolean = false;
  private vibrationInterval: any;

  constructor(
    private zone: NgZone,
    public reminderService: ReminderService,
    private translate: TranslateService,
  ) {}

  ngOnInit() {
    const webkitSpeechRecognition = (window as any).webkitSpeechRecognition;

    if (webkitSpeechRecognition) {
      this.recognition = new webkitSpeechRecognition();

      const langMap: { [key: string]: string } = {
        es: 'es-ES',
        en: 'en-US',
        fr: 'fr-FR',
        de: 'de-DE',
      };
      this.recognition.lang = langMap[this.translate.currentLang] || 'en-US';

      this.recognition.continuous = false;
      this.recognition.interimResults = false;

      this.recognition.onstart = () => {
        console.log('Voice recognition started');
        this.zone.run(() => {
          this.listening = true;
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

    // Palabras clave por idioma
    const keywords: { [lang: string]: string[] } = {
      es: ['recordar', 'recuerda', 'recordatorio'],
      en: ['remind', 'reminder'],
      fr: ['rappelle', 'rappel'],
      de: ['erinnere', 'erinnerung'],
    };

    const currentLang = this.translate.currentLang || 'en';
    const langKeywords = keywords[currentLang] || keywords['en'];

    const foundKeyword = langKeywords.some((k) => lower.includes(k));

    // Detectar hora básica (12h o 24h)
    const timeMatch = lower.match(
      /(\d{1,2})(?::(\d{2}))?\s?(a\.?m\.?|p\.?m\.?|am|pm)?/,
    );

    if (foundKeyword) {
      if (timeMatch) {
        const hour = timeMatch[1];
        const minutes = timeMatch[2] || '00';
        const period = timeMatch[3]
          ? timeMatch[3].replace(/\./g, '').toUpperCase()
          : '';

        const timeString = period
          ? `${hour}:${minutes} ${period}`
          : `${hour}:${minutes}`;

        this.reminderService.addReminder({
          text: text,
          time: timeString,
          createdAt: new Date(),
        });

        // Mensaje de respuesta traducido por idioma
        const responseMessages: { [lang: string]: string } = {
          es: `Recordatorio establecido para ${timeString}.`,
          en: `Reminder set for ${timeString}.`,
          fr: `Rappel programmé pour ${timeString}.`,
          de: `Erinnerung gesetzt für ${timeString}.`,
        };
        this.response = responseMessages[currentLang] || responseMessages['en'];
      } else {
        const noTimeMsg: { [lang: string]: string } = {
          es: 'Recordatorio anotado, pero no pude detectar la hora.',
          en: 'Reminder noted, but I could not detect the time.',
          fr: 'Rappel noté, mais je n’ai pas pu détecter l’heure.',
          de: 'Erinnerung notiert, konnte aber die Uhrzeit nicht erkennen.',
        };
        this.response = noTimeMsg[currentLang] || noTimeMsg['en'];
      }
    } else {
      const notUnderstandMsg: { [lang: string]: string } = {
        es: 'Lo siento, no entendí la solicitud.',
        en: 'Sorry, I did not understand the request.',
        fr: 'Désolé, je n’ai pas compris la demande.',
        de: 'Entschuldigung, ich habe die Anfrage nicht verstanden.',
      };
      this.response = notUnderstandMsg[currentLang] || notUnderstandMsg['en'];
    }
  }

  speakResponse() {
    if ('speechSynthesis' in window && this.response) {
      const utterance = new SpeechSynthesisUtterance(this.response);

      // Mapear idioma
      const langMap: { [key: string]: string } = {
        es: 'es-ES',
        en: 'en-US',
        fr: 'fr-FR',
        de: 'de-DE',
      };
      const selectedLang = langMap[this.translate.currentLang] || 'en-US';
      utterance.lang = selectedLang;

      // Voces naturales por idioma
      const voiceNameMap: { [key: string]: string } = {
        es: 'Google español',
        en: 'Google US English',
        fr: 'Google français',
        de: 'Google Deutsch',
      };

      // Esperar a que las voces estén cargadas
      const speakWithVoice = () => {
        const voices = window.speechSynthesis.getVoices();
        const selectedVoice = voices.find(
          (v) => v.name === voiceNameMap[this.translate.currentLang],
        );
        if (selectedVoice) {
          utterance.voice = selectedVoice;
        }

        // Ajustes de velocidad y tono
        utterance.rate = 0.95; // ligeramente más natural
        utterance.pitch = 1; // tono neutro
        window.speechSynthesis.speak(utterance);
      };

      if (window.speechSynthesis.getVoices().length === 0) {
        // Si las voces aún no están cargadas, esperar al evento
        window.speechSynthesis.onvoiceschanged = () => {
          speakWithVoice();
        };
      } else {
        speakWithVoice();
      }
    }
  }
}
