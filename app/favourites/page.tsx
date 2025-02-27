export default function Page() {
  return (
    <div className="page">
      <h2>Favourites</h2>
      <div
        style={{
          background: "#a0153e",
          padding: "1rem",
          borderRadius: "24px",
          color: "#fff",
          margin: "1rem auto",
        }}
      >
        <h4>
          Your favorites are currently stored in your browser`s local storage.
          Creating an account will allow you to save them permanently allowing
          you to access then on any device.
        </h4>
      </div>
    </div>
  );
}
