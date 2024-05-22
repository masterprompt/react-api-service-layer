# React API Service Layer

Give your application an API service layer!  Define `Service Classes` that utilize the abstract `ApiService`.  The benefit to `ApiService` is it has abstract api-typical methods so one can use it as a mocking service or  as an implementation of your faviorite request library.

Generally you'll want to:
1. [Implement your own ApiService(s)](#APISERVICE)
2. [Create Service Classes](#SERVICECLASS) that utilize your `ApiServices` (created in step 1)
3. Use the provided hooks to create memoizations of those services for your custom-hooks/components

## Installation

`npm install --save react-api-service-layer`

## Usage

### <a name="APISERVICE"></a>Implementing ApiService

You'll want to implement your own `ApiService` classes.  Perhaps you'll want to use Axios:

```
import { ApiService } from 'react-api-service-layer';
import axios from 'axios';

class AxiosApiService extends ApiService {
    baseUrl: string = 'http://my-api.com';

    //  Override the get for this example
    get(resourcePath: string, options?: any): Promise<any> {
        return axios.get(`${this.baseUrl}${resourcePath}`);
    }

    post(resourcePath: string, payload: any, options?: any): Promise<any> {
        throw new Error('Method not implemented.');
    }

    put(resourcePath: string, payload: any, options?: any): Promise<any> {
        throw new Error('Method not implemented.');
    }

    patch(resourcePath: string, payload: any, options?: any): Promise<any> {
        throw new Error('Method not implemented.');
    }

    delete(resourcePath: string, options?: any): Promise<any> {
        throw new Error('Method not implemented.');
    }

}
```

Or maybe you'll want to create some data mocking service:

```
import { ApiService } from 'react-api-service-layer';

const mockGets = {
    '/todos': []
}

class MockApiService extends ApiService {

    //  Override the get for this example
    get(resourcePath: string, options?: any): Promise<any> {
        return mockGets[resourcePath];
    }

    post(resourcePath: string, payload: any, options?: any): Promise<any> {
        throw new Error('Method not implemented.');
    }

    put(resourcePath: string, payload: any, options?: any): Promise<any> {
        throw new Error('Method not implemented.');
    }

    patch(resourcePath: string, payload: any, options?: any): Promise<any> {
        throw new Error('Method not implemented.');
    }

    delete(resourcePath: string, options?: any): Promise<any> {
        throw new Error('Method not implemented.');
    }

}

```


### <a name="SERVICECLASS"></a>Build Service Classes

#### Composition Pattern

Personally, I'm a big fan of [composition pattern](https://dev.to/alexmercedcoder/oop-design-patterns-in-javascript-3i98#:~:text=Composite%20Pattern%20in%20JavaScript,and%20compositions%20of%20objects%20uniformly.).

```
import { ApiService } from 'react-api-service-layer';

class TodoService {
    apiService: APIService

    getTodos() {
        return this.apiService.get('path-to-my-service');
    }
}

```

#### Inheritance Pattern

Surely you can inherit your api service well enough

```
class TodoService extends AxiosApiService {
    getTodos() {
        return this.get('/todos')
    }
}

```

### <a name="HOOKS"></a>Use Service Classes in React

The hooks provided describe patterns for setting the `ApiService` in your `Service Classes`.

#### useService

`useService` is generically typed, so you'll need to provide the typing AND the class.  Any additional constructor params are optional from there on out.


##### Constructor pattern

```
import { useService, ApiService, useConstructableApiService } from 'react-api-service-layer';

class TodoService {
    apiService: APIService

    constructor (apiService: ApiService) {
        this.apiService = apiService;
    }

    getTodos() {
        return this.apiService.get('path-to-my-service');
    }
}

const MyComponent = () => {
    const apiService = useService<AxiosApiService>(AxiosApiService);
    const todoService = useService<TodoService>(TodoService, apiService);

    React.useEffect( async () => {
        const todos = await todoService.getTodos();
        console.log('Todos:', todos);
    }, []);
    
    return (
        <div>
            Hello World
        </div>
    )
}

```

##### Setter pattern

```
import { useService, ApiService, useConstructableApiService } from 'react-api-service-layer';

class TodoService {
    apiService: APIService

    setApiService(apiService: ApiService) {
        this.apiService = apiService;
    }

    getTodos() {
        return this.apiService.get('path-to-my-service');
    }
}

const MyComponent = () => {
    const apiService = useService<AxiosApiService>(AxiosApiService);
    const todoService = useService<TodoService>(TodoService);
    
    React.useEffect( async () => {
        todoService.setApiService(apiService);
        const todos = await todoService.getTodos();
        console.log('Todos:', todos);
    }, []);
    
    return (
        <div>
            Hello World
        </div>
    )
}

```