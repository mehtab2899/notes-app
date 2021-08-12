import React from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";

const Error = () => {
	return (
		<ErrorContainer>
			<Container>404 error</Container>
		</ErrorContainer>
	);
};

const ErrorContainer = styled.div``;

export default Error;
