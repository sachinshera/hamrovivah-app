import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() { }

  async get(key: string): Promise<any> {
    return (await Preferences.get({ key: key })).value;
  };

  async set(key: string, value: any): Promise<void> {
    await Preferences.set({ key: key, value: value });
  };

  async remove(key: string): Promise<void> {
    await Preferences.remove({ key: key });
  };

  async clear(): Promise<void> {
    await Preferences.clear();
  };

  async keys(): Promise<{ keys: string[] }> {
    return await Preferences.keys();
  };
}
