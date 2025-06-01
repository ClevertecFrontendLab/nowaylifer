import { Dict } from '@chakra-ui/utils';

export class HistoryStore<T extends Dict> {
    get(): T {
        return this.usrState;
    }

    set(next: T) {
        this.replaceUsrState(next);
    }

    update(patch: Partial<T>): void {
        const updated = { ...this.usrState, ...patch };
        this.replaceUsrState(updated);
    }

    delete(...keys: (keyof T)[]): void {
        const current = { ...this.usrState };
        for (const key of keys) {
            delete current[key];
        }
        this.replaceUsrState(current);
    }

    clear(): void {
        this.replaceUsrState({});
    }

    private replaceUsrState(usr: Partial<T>): void {
        const nextState = { ...this.rawState, usr };
        window.history.replaceState(nextState, '', window.location.href);
    }

    private get usrState(): T {
        return (this.rawState.usr ?? {}) as T;
    }

    private get rawState() {
        return window.history.state ?? {};
    }
}

export const createHistoryStore = <T extends Dict>() => new HistoryStore<T>();
