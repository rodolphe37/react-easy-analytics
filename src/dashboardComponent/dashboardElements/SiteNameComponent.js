const SiteNameComponent = ({ siteName, sitesList }) => {
  return (
    <div>
      {siteName
        ? sitesList.map((res, id) => (
            <span
              style={{
                color: "white",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-around",
              }}
              key={id}
            >
              <span
                style={{
                  fontSize: 20,
                  color: "orange",
                  fontWeight: "bold",
                  paddingBottom: "1rem",
                }}
              >
                Site Id :
              </span>
              <span className="App-link">{res}</span>
            </span>
          ))
        : ""}
    </div>
  );
};

export default SiteNameComponent;
