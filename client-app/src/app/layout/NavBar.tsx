import React from "react";
import { Container, Menu, Button } from "semantic-ui-react";

function NavBar({ openForm }: { openForm: (id?: string) => void }) {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities"></Menu.Item>
        <Menu.Item>
          <Button
            onClick={() => openForm()}
            positive
            content="Create Activity"
          ></Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
}

export default NavBar;
