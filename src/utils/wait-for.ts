export const waitFor = (ms: number) =>
    new Promise((res) => {
        setTimeout(res, ms);
    });
