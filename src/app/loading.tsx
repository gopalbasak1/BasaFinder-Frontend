import "./spinner.css"; // Import the CSS file

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
