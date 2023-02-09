import React from "react";
import { Button, Nav } from "react-bootstrap";
import { SingleItemProps } from "./SideNavBar";

type SingleListProps = {
  data: SingleItemProps[];
  name: string;
  clickFn: () => void;
};

const SingleListItems: React.FC<SingleListProps> = ({
  data,
  name,
  clickFn,
}) => {
  return (
    <div>
      {data.length > 0 && (
        <>
          <div className="px-3 ft-14 mt-4 text-secondary">
            {name.toUpperCase()}
          </div>
          <Nav className="flex-column px-4">
            {data.map((item) => {
              return item.url !== "#" ? (
                <Nav.Link href={item.url} key={item.id}>
                  <span style={{ marginRight: "5px" }}>
                    {item.icon()}
                  </span>
                  <span className="text-dark ft-14">{item.name}</span>
                </Nav.Link>
              ) : (
                <Button
                  variant="success"
                  onClick={() => clickFn()}
                  key={item.id}
                  className="border-0 bg-login mt-3"
                  style={{ cursor: "pointer" }}
                >
                  <span style={{ marginRight: "5px" }}>{item.icon()}</span>
                  <span className="text-white ft-14">{item.name}</span>
                </Button>
              );
            })}
          </Nav>
        </>
      )}
    </div>
  );
};

export default SingleListItems;
