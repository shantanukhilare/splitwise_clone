### Backend
    # Account
        -   POST    Register User
        -   POST    Login user
        -   PUT     Update user details
    # Expenses
        -   POST    Create New Expense
        -   GET     Get overall expense (calculated)
        -   POST    Split evenly
        -   POST    Split unevenly
        -   POST    Split by percentage
        -   PUT     Update expense
        -   PUT     DELETE expense
    # Group
        -   POST    Create Group
        -   GET     List of Group by user
        -   PUT     Add or remove users or change group name
        -   PUT     DELETE group
    # splitwise_clone
| Method | Endpoint                | Description               |
| ------ | ----------------------- | ------------------------- |
| `POST` | `/users`                | Create a new user         |
| `POST` | `/groups`               | Create a group            |
| `POST` | `/groups/{id}/members`  | Add member(s) to a group  |
| `POST` | `/groups/{id}/expenses` | Add expense to group      |
| `GET`  | `/groups/{id}/balances` | Get who owes whom         |
| `POST` | `/payments`             | Record manual settlements |

 ### Database entity
    -   users
            -   firstname
            -   lastname
            -   username
            -   password
            -   mobileNumber
            -   
    -   groups
            -   name
            -   users (joins users table) 
    -   expenses
            -   description
            -   price
            -   splitType
            -   users
    -   Type
            -   evenly
            -   unevenly
            -   

### API
