import { useService } from './use-service';
import { renderHook } from '@testing-library/react-hooks';

class UnconstructedClass {
    type: string = 'UnconstructedClass';
}

class ConstructedClass extends UnconstructedClass {
    constructor (type: string) {
        super();
        this.type = type;
    }
}

describe('useService', () => {
    describe('UnconstructedClass', () => {
        test('should create UnconstructedClass classes properly', () => {
            const { result } = renderHook(() => useService<UnconstructedClass>(UnconstructedClass))
            expect(result.current.type).toEqual('UnconstructedClass');
        })
    });
    describe('ConstructedClass', () => {
        test('should create ConstructedClass classes properly', () => {
            const { result } = renderHook(() => useService<ConstructedClass>(ConstructedClass, 'complex'))
            expect(result.current.type).toEqual('complex');
        })
    });
});