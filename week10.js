//construct information for each tool submission
class Tool{
    constructor(toolID,type){
        this.toolID=toolID;
        this.type=type;
    }
}
class Project{
    constructor(id,projectName){
        this.id=id;;
        this.projectName=projectName;
        //array of all the tools that are going to be used for this project
        this.tools=[]
    }
    //method takes a tool and add to tools array
    addTool(tool){
        this.tools.push(tool);
    }
    deleteTool(tool){
        //find the index of the tool in the tools array and remove that array member
        let index=this.tools.indexOf(tool);
        this.tools.splice(index,1)
    }
}
//id is from html element on which the eventlistener going to be applied ,
//action is a function which dictates what is going to happen 
//whenever the element with the specified id is clicked, function "action" is going to be implemented
function onClick(id,action){
    let element=document.getElementById(id);
    element.addEventListener('click',action);
    return element;
}
//every project created is going to be stored in the projects array
let projects=[];
//used to assign ID to each project
let projectID=0;
//Every time the "Submit" button is clicked, there's a new project added to the array
onClick('new-project',()=>{
    //return the projectID value and +1 for the next time that it's called
    //return the new project name
    projects.push(new Project(projectID++,document.getElementById('project-name').value));
    //drawDom goes over the projects array and build new table for that
    drawDOM();

})


function drawDOM(){
    //find the projects-div from html
    let projectDiv=document.getElementById('projects');
    //clear the div, while there's a firstChild, this is going to delete that first child until the element is empty
    while (projectDiv.firstChild){
        projectDiv.firstChild.remove(projectDiv.firstChild);
    }
    //go through the projects array
    for (i=0;i<projects.length;i++){
        //each project has each own table consists of required tools
        //pass instance of the Project class and give the table
        let table=createProjectTable(projects[i]);
        let title=document.createElement('h2');
        title.innerHTML=projects[i].projectName;
        //delete a given project when the button is clicked
        title.appendChild(createDeleteProjectButton(projects[i]));
        projectDiv.appendChild(title);
        projectDiv.appendChild(table);
        //add all tools to the project project
        for (k=0;k<projects[i].tools.length;k++){
            //take the name of the project, the table, and the tools
            createToolRow(projects[i],table,projects[i].tools[k]);
        }
    }
}
function createToolRow(project,table,tool){
    let row=table.insertRow(2);
    row.insertCell(0).innerHTML=tool.toolID;
    row.insertCell(1).innerHTMP=tool.type;
    let actions=row.insertCell(2);
    //create a button that takes a tool from a project and remove it
    actions.appendChild(createDeleteRowButton(project,tool));
}
//Create delete function for a whole project and tool
function createDeleteProjectButton(project){
    let btn=document.createElement('button');
    btn.className='btn btn-danger';
    btn.innerHTML='Delete Project';
    btn.onClick=()=>{
        let index=projects.indexOf(project);
        projects.splice(index,1);
        drawDOM();
    }
    return btn;
}
//Create delete function for a tool
function createDeleteRowButton(project,tool){
    let btn=document.createElement('button');
    btn.className='btn btn-warning';
    btn.innerHTML="Delete tool";
    btn.onClick=()=>{
        let index=project.tools.indexOf(tool);
        project.tools.splice(index,1);
        //we change the original data and regenerate and show a new data set
        drawDOM()
    }
    return btn;
}
function createNewToolButton(project){
    let btn = document.createElement('button');
    btn.className='btn btn-primary';
    btn.innerHTML='Add';
    btn.onClick=()=>{
        project.tools.push(new Tool())
        drawDOM();
    }
    return btn;
}

//take a project and build a table out of that
function createProjectTable(project){
    //create table that has information of this project
    let table=document.createElement('table');
    table.setAttribute('class','table table-dark table-striped');
    let row=table.insertRow(0);
    let toolColumn=document.createElement('th');
    let typeColumn=document.createElement('th');
    toolColumn.innerHTML='Tool ID';
    typeColumn.innerHTML='Tool Type';
    row.appendChild(toolColumn);
    row.appendChild(typeColumn);
    //create a row that has a form for new tool input
    let insertToolRow=table.insertRow(1);
    let toolIdTh=document.createElement('th');
    let typeTh=document.createElement('th');
    let createTool=document.createElement('th');
    let toolIDInput=document.createElement('input');
    toolIDInput.setAttribute('id',`tool-input-`)
    toolIDInput.setAttribute('class','form-control');
    toolIDInput.setAttribute('type','text');
    let typeInput=document.createElement('input');
    typeInput.setAttribute('id',`type-input`)
    typeInput.setAttribute('class','form-control');
    typeInput.setAttribute('type','text');
    //use this button to add tool to the specified project
    let newToolButton=createNewToolButton(project);
    //add inputs to the cell
    toolIdTh.appendChild(toolIDInput);
    typeTh.appendChild(typeInput);
    createTool.appendChild(newToolButton);
    insertToolRow.appendChild(toolIdTh);
    insertToolRow.appendChild(typeTh);
    insertToolRow.appendChild(createTool);
    return table;
}

/*let id=0;
document.getElementById('add').addEventListener('click',()=>{
    let table=document.getElementById('submission-log');
    let row=table.insertRow(1);
    row.setAttribute('id',`item ${id}`);
    row.insertCell(0).innerHTML=document.getElementById('check-out-tool').value;
    row.insertCell(1).innerHTML=document.getElementById('check-out-timestamp').value;
     //`${createdDate.getMonth()}-${createdDate.getDate()}-${createdDate.getFullYear()}
    row.insertCell(2).innerHTML=document.getElementById('project').value;
    let action = row.insertCell(3);
    action.appendChild(createReturnButton(id++));
    document.getElementById('check-out-tool').value='';
    document.getElementById('project').value='';

})
function createReturnButton(id){
    let btn=document.createElement('button');
    btn.className='btn btn-primary';
    btn.id = id;
    btn.innerHTML='Return';
    btn.onClick=()=>{
        //let returnDate = new Date();
        //returnDate.parentNode.insertCell(returnDate);
       row.insertCell(4).innerHTML=new Date();
    }
}*/