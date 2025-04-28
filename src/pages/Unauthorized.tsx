const Unauthorized = () => {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center p-8">
        <h1 className="text-4xl font-bold text-red-600">🚫 Unauthorized</h1>
        <p className="mt-4 text-gray-700">
          You don’t have permission to access this page.
        </p>
      </div>
    );
  };
  
  export default Unauthorized;
  