import {Form, Grid, Button} from "semantic-ui-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function TaskFormPage() {

  const [newTask, setNewTask] = useState({
    title:"",
    description:""
  });

  const [errors, setErrors] = useState({
    title:"",
    description:""
  });

  const router = useRouter();

  const validate = () => {
    const errors = {}

    if(!newTask.title)
    {
      errors.title = "Title is required.";
    }
    if(!newTask.description)
    {
      errors.description = "Description is required.";
    }
    return errors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let errors = validate();
    if(Object.keys(errors).length) return setErrors(errors);

    if(router.query.id){
      await updateTask();
      await router.push('/');
    }else{
      await createTask();
      await router.push('/');
    }

  }

  const createTask = async() => {
    try {
      await fetch('http://localhost:3000/api/tasks', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTask)
      })
    } catch (error) {
      console.log(error)
    }
  }

  const updateTask = async () => {
    try {
      await fetch('http://localhost:3000/api/tasks/'+router.query.id,{
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newTask)
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange= (e) => {
    setNewTask({...newTask,[e.target.name]: e.target.value});
    console.log(newTask)
  }

  const getTaskId = async () => {
    const res = await fetch('http://localhost:3000/api/tasks/'+router.query.id);
    const data = await res.json();
    setNewTask({title:data.title,description:data.description})
  }

  useEffect(() =>{
    if(router.query.id){getTaskId()}
  },[])

  return (
    <Grid
    centered
    verticalAlign="middle"
    columns="3"
    style={{height: "80vh" }}
    >
      <Grid.Row>
        <Grid.Column textAlign="center">
          <h1>{router.query.id ? 'Update Task' : 'Create Task'}</h1>
          <Form  onSubmit={handleSubmit}>
            <Form.Input label="Title" placeholder="Title" name="title" onChange={handleChange}  error={ errors.title ? { content: "Please enter a title", pointing: "below" } : null} value={newTask.title}  />
            <Form.TextArea label="Description" placeholder="Description" name="description" onChange={handleChange}  error={ errors.description ? { content: "Please enter a description", pointing: "below" } : null} value={newTask.description}/>
            <Button primary>
              {router.query.id ? 'Update' : 'Save'}
            </Button>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}