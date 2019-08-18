
# ![Node/Express/Mongoose Task App](node_icon.png)

[![Build Status](https://circleci.com/gh/apollographql/apollo-server.svg?style=svg)](https://todo-service-api.herokuapp.com/graphql)

> ### Node - Graphql - Mongoose


## Getting started

* Install with `npm install`
* Develop `npm run dev-watch`
* `🚀 Server ready at http://localhost:3000/graphql`;

## Documentation

- Queries
```
query queryExecute {
  tasks {
    _id
    description
    status
  }
}
```
- Mutations
```
mutation mutationExecute {
  createTask(description: "Integration graphql") {
    success
    result {
      _id
    }
  }
  updateTask(id: "") {
    success
    result {
      _id
    }
  }
  deleteTask(id: "") {
    success
    result {
      _id
    }
  }
}

```



## Maintainers
- [@NguyenHoangAnh](https://github.com/hoanganh-nguyen94) (Frontend Developer)
