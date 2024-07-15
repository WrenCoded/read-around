import { Container, Row, Col, Button } from "react-bootstrap";
import { AuthContext } from "../AuthContext";
import { useContext } from "react";

export default function Home() {
   const { isLoggedIn, username, logout } = useContext(AuthContext);

   if (isLoggedIn) {
      return (
        <Container className="vh-100 d-flex align-items-center justify-content-center">
          <Row>
            <Col>
              <h1 className="text-center">Welcome, {username}!</h1>
              <div className="container d-flex justify-content-center mt-4 space-evenly gap-3">
                <Button variant="danger" onClick={logout}>
                  Logout
                </Button>
                <Button variant="primary" href="/user-profile">
                  My Profile
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      );
   }
else {
 return (
   <Container className="vh-100 d-flex align-items-center justify-content-center">
     <Row>
       <Col>
         <h1 className="text-center">Welcome to Read Around</h1>
         <h2>The app to borrow and lend books with your friends</h2>
         <div className="container d-flex justify-content-center mt-4 space-evenly gap-3">
           <Button variant="primary" href="/signup" className="mr-5">
             Sign Up
           </Button>
           <Button variant="secondary" href="/login">
             Login
           </Button>
         </div>
       </Col>
     </Row>
   </Container>
 );
}

 

}
