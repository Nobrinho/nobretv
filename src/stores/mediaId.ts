import { defineStore } from 'pinia';

export const useMediaIdStore = defineStore('mediaId', {
    state: () => ({
        mediaId: null as string | null,
    }),
    getters: {
        getMediaId(): string | null {
            return this.mediaId;
        },
    },
    actions: {
        setMediaId(id: string) {
            this.mediaId = id;
        },
    },
});