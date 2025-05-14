export interface EmailVerificationHistoryState {
    emailVerified?: boolean;
}

export const emailVerificationHistoryState = {
    getState: () => (history.state?.usr as EmailVerificationHistoryState | null)?.emailVerified,
    clearState: () => {
        delete (history.state?.usr as EmailVerificationHistoryState | null)?.emailVerified;
        history.replaceState(history.state, '');
    },
};
