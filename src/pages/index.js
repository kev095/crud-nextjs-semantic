import { Button,Card, Container, Grid} from "semantic-ui-react";
import { useRouter } from "next/router";

export default function HomePage({tasks}) {
  
  const router = useRouter();

  if(tasks.length === 0) return(
    <Grid centered verticalAlign="middle" columns={1} style={{height: "80vh"}}>
      <Grid.Row>
        <Grid.Column textAlign="center">
          <h1>The are no tasks yet</h1>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )

  //Render a list of task
  return (
    <Container>
      <br></br>
      <Card.Group itemsPerRow={4}>
        {tasks.map((task) => (
          <Card key={task._id}>
            <Card.Content>
              <Card.Header>{task.title}</Card.Header>
              <p>{task.description}</p>
            </Card.Content>
            <Card.Content extra>
              <Button primary onClick={() => router.push(`/tasks/${task._id}`)}>View</Button>
              <Button primary onClick={() => router.push(`/tasks/${task._id}/edit`)}>Edit</Button>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Container>
  )
}

export const getServerSideProps = async (ctx) => {
  const res = await fetch("http://localhost:3000/api/tasks");
  const tasks = await res.json();

  return{
    props: {
      tasks,
    }
  }
}