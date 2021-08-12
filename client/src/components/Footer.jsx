import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";

const Footer = () => {
	return (
		<FooterContainer>
			<Container>
				<Row>
					<Col className="text-center">
						<h6> No &copy; copyright issues!</h6>
						<p>Feel Free to copy.</p>
					</Col>
				</Row>
			</Container>
		</FooterContainer>
	);
};

const FooterContainer = styled.footer`
	width: 100%;
	margin: 1rem 0 0;
	color: #000;

	h6 {
		margin: 1rem 0 0;
	}

	@media only screen and (max-width: 368px) {
		h6,
		p {
			font-size: 0.8rem;
		}
	}
`;

export default Footer;
