import React from "react";
import styled from "styled-components";
import { Container, Row } from "react-bootstrap";

const Main = ({ title, children }) => {
	return (
		<MainContainer>
			<Container>
				<Row>
					<div>
						{title && (
							<>
								<h1 className="heading">{title}</h1>
								<hr className="mt-1" />
							</>
						)}
						{children}
					</div>
				</Row>
			</Container>
		</MainContainer>
	);
};

const MainContainer = styled.div`
	min-height: 93vh;
	display: flex;
	padding: 10px 0 0;
`;

export default Main;
