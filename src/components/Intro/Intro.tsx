  <section id="intro">
    <div className="intro">
      <motion.div
        className="left"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className={`imgContainer ${isHovered}`}>
          <img src="pedro.png" alt="Pedro smiling" />
        </div>
      </motion.div>
    </div>
  </section> 