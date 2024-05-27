import { Link } from "react-router-dom";
import tw from "tailwind-styled-components";

const ErrorPage = () => {
  return (
    <Container>
      <NormalText>
        Page not found{" "}
        <Link to={"/"} className="text-fbButtonColor">
          Go back!
        </Link>
      </NormalText>
      <BigText>404</BigText>
    </Container>
  );
};

const Container = tw.div`
bg-golf
flex
flex-col 
justify-center 
items-center 
w-screen 
h-screen 
bg-center 
bg-cover 
`;

const NormalText = tw.h6`
text-[20px] 
font-extrabold 
text-black
`;

const BigText = tw.h1`
text-[25px] 
font-bold 
`;

export default ErrorPage;
