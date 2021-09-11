import * as React from 'react';
import { Link } from 'gatsby';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { JournalBookmark as IconJournalBookmark } from 'react-bootstrap-icons';

type DataProps = {
  location: Location;
};

const LayoutHeader: React.FC<DataProps> = ({ location }) => {
  return (
    <Navbar as="header" bg="primary" variant="dark">
      <Container as="nav" fluid="xxl">
        <Navbar.Brand as={Link} to="/">
          <IconJournalBookmark className="bi me-2" />
          <span className="fw-light">
            <span className="d-none d-sm-inline">西交网管会</span>
            开源文档平台
          </span>
        </Navbar.Brand>
        <Nav>
          <Nav.Link
            as={Link}
            to="/docs/getting-started/introduction.html"
            active={location.pathname.startsWith('/docs')}>
            文档
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/blog"
            active={location.pathname.startsWith('/blog')}>
            博客
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/about.html"
            active={location.pathname.startsWith('/about.html')}>
            关于
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default LayoutHeader;
