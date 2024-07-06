return (
    <div>
      <Navbar />
      <div className="work-form">
        <div className="workbody" >
          <div className="body">
            <section className="cont">
              <div className="login-container">
                <div className="work-container">
                  <h1 className="opacity">Add your workout</h1>
                  <form className="work-form">
                    <label>Workout type:</label>
                    <select
                      onChange={(e) => setWorkoutType(e.target.value)}
                      value={workoutType}
                      className={
                        emptyFields.includes("workoutType") ? "error" : ""
                      }
                      id="worktype"
                    >
                      <option value="">Select workout type</option>
                      <option value="Running">Running</option>
                      <option value="Jogging">Jogging</option>
                      <option value="Swimming">Swimming</option>
                      <option value="Cycling">Cycling</option>
                      <option value="Yoga">Yoga</option>
                      <option value="Weightlifting">Weightlifting</option>
                    </select>
                    <label>Duration (HH:MM) </label>
                    <input
                      id="duration"
                      type="time"
                      onChange={(e) => setDuration(e.target.value)}
                      value={duration}
                      className={
                        emptyFields.includes("duration") ? "error" : ""
                      }
                    />
                    <label>Intensity ({getLabel(intensity)})</label>
                    <div className="work-grid">
                      <div className="input-range">
                        <input
                          id="intensity"
                          type="range"
                          min="1"
                          max="3"
                          step="1"
                          onChange={(e) => setIntensity(Number(e.target.value))}
                          value={intensity}
                          className={
                            emptyFields.includes("intensity") ? "error" : ""
                          }
                        />
                      </div>
                      <input
                        id="date"
                        type="date"
                        onChange={(e) => setDate(e.target.value)}
                        value={date}
                        className={emptyFields.includes("date") ? "error" : ""}
                      />
                    </div>
                  </form>
                  <button className="addwork-btn" onSubmit={handleSubmit} >Add Workout</button>
                </div>
                {error && <div className="error">{error}</div>}
              </div>
              <div className="theme-btn-container"></div>
            </section>
          </div>
        </div>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Workout Recorded"
          className="modal"
          overlayClassName="overlay"
          onChange={(e) => setCaloriesBurned(caloriesBurned)}
        >
          <h2>Your workout has been recorded.</h2>
          <p>
            You burned approximately{" "}
            <p className="calorie">{caloriesBurned} calories🔥</p>
          </p>
          <button className="ok-btn" onClick={closeModal}>
            OK
          </button>
        </Modal>
      </div>
    </div>
  );
};

export default WorkoutForm;


