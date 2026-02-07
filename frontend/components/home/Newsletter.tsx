const Newsletter = () => {
  return (
    <div className="max-w-125 mx-auto space-y-5 py-14">
      
      <h1 className="text-3xl font-bold font-serif text-center">
        Ready to Manage Smarter?
      </h1>

      <p className="max-w-100 mx-auto text-text-secondary text-sm text-center">
        Join hundreds of managers and residents using StaySync to
        organize their living spaces and streamline operations.
      </p>

      <div className="mt-10 flex gap-2 justify-center">
        <input
          type="email"
          placeholder="Enter your email"
          className="px-4 py-4 ring-1 ring-border"
        />
        <button className="primary-btn">
          Get Started
        </button>
      </div>

    </div>
  );
};

export default Newsletter;
