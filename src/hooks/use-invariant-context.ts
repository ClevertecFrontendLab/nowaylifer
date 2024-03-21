import { Context, useContext } from 'react';
import invariant from 'invariant';

export const useInvariantContext = <T>(context: Context<T>) => {
    const contextValue = useContext(context);

    invariant(contextValue, `Out of ${context.displayName ?? context.Provider.name} context`);

    return contextValue;
};
