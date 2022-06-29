const UsersNumberComponent = ({ USERS, usersIdList }) => {
  return (
    <div>
      {USERS ? (
        <>
          <span
            style={{
              fontSize: 20,
              color: "orange",
              fontWeight: "bold",
              padding: "1rem",
              width: "90%",
              borderBottom: "1px dotted red",
              paddingTop: "1rem",
              paddingBottom: "1.8rem",
            }}
          >
            Users number:
          </span>
          <span
            className="App-link"
            style={{
              fontSize: 22,
              fontWeight: "bold",
              padding: 15,
              width: "90%",
              borderBottom: "1px dotted red",
            }}
          >
            {usersIdList.length}
          </span>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default UsersNumberComponent;
