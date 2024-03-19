export const createDestroyObserver = (predicate: (node: Node) => boolean, callback: () => void) =>
    new MutationObserver((mutations, observer) => {
        for (const mutation of mutations) {
            for (const removedNode of mutation.removedNodes) {
                if (predicate(removedNode)) {
                    observer.disconnect();
                    return callback();
                }
            }
        }
    });
