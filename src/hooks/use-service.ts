import React from 'react';

export type NewableService<T> = {
    new(...args: any[]): T;
};

export function useService<ServiceType,>( type: NewableService<ServiceType>, ...args :any[] ): ServiceType {
    return React.useMemo(
        () => new type(...args),
        []
    );
}
