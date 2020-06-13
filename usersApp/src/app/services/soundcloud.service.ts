import { Injectable } from '@angular/core';
import { Platform } from "@ionic/angular";
import 'rxjs/add/operator/map';

declare var SC;

@Injectable({
  providedIn: 'root'
})

export class SoundcloudService {

//Reference: https://www.joshmorony.com/streaming-music-from-soundcloud-in-ionic-2-part-1/
//Reference: https://developers.soundcloud.com/docs/api/reference#oembed

    private clientId: string = 'YOUR_CLIENT_ID';
    private tracks: any[] = [];
    private playTrack: number = 0;/* 
    public currentTrack: Track; */

    constructor(private platform: Platform) {

        this.platform.ready().then(() => {
            SC.initialize({
                client_id: this.clientId
            });
        });

    }

    fetchTracks(bpm: number, genre:string): void {

    }

    startStreaming(){

    }

}