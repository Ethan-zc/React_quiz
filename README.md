## Bugs:
- **Switching between 'Pending tasks' and 'Completed tasks' will produce duplicated items**
  
The reason for this bug is key for different list element should not be the same. The program use item.content as key while doing map, which would cause to the duplicant of completed element in pending list. 
  
  By adding index into the div part, it would differ each element according to their index, which would not repeat. 
  
  ``````javascript
  this.state.todoList.todoItems.map((item,index) => !item.done ? (
              <div key={index}>
                <input type="checkbox" defaultChecked={item.done} onChange={() => {
                  item.finishTask();
                }}/>
                <span>{item.content}</span>
                <span style={{ fontSize: '12px', color: 'grey', padding: '0 10px' }}>{ "Created at: " + item.createdAt}</span>
                <button type="button" onClick={() => {
                  item.removeTask();
                }}>X</button>
              </div>) : null)
  ``````
  
  
  
- **Completed items will become pending on reload**

  This is because of the missing of save changes to localStorage. By adding saveToLS() function to finishTask(), it would be solved. 

  ``````javascript
  finishTask() {
      this.done = true;
      this.container.container.setState({ todoList: this.container })
      this.container.saveToLS();
    }
  ``````

  

- **Pressing Enter at the input box cannot add the item**

  Here I add the event listener to catch the action on keyboard and judege if it is enter. 

  ``````javascript
  <input type="text" value={this.state.inputText} onChange={(event) => {
                this.setState({ inputText: event.target.value });
              }} 
              onKeyDown={(event)=>{
                if (event.keyCode  === 13) {
                  this.state.todoList.addTask(this.state.inputText);
                }
              }}/>
  ``````

  

## Code 

Before modification, the main Javascript code is edited in index.html, which would be hard to maintain in the future. Therefore, I put them into index.js file for better structure. 

At the same time, App component could be seperated to PendingList and CompletedList, which would be easier to reuse and maintain. 