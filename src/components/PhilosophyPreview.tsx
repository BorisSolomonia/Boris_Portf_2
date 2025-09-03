import { motion } from 'framer-motion'
import DataVisualization from './DataVisualization'

const PhilosophyPreview = () => {
  const principles = [
    {
      symbol: "∞",
      title: "Lyrical Composition",
      description: "Every interface flows like Botticelli's brushstrokes—organic, rhythmic, purposeful."
    },
    {
      symbol: "◊",
      title: "Golden Architecture", 
      description: "Systems designed with divine proportions, where beauty serves function and function serves users."
    },
    {
      symbol: "⚡",
      title: "Symbolic Clarity",
      description: "Complex financial concepts rendered as elegant metaphors—vines of growth, fortresses of security."
    }
  ]

  return (
    <section className="py-20 px-6 bg-white/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif-elegant text-renaissance-brown mb-6">
            The Renaissance Method
          </h2>
          <p className="text-lg text-renaissance-blue max-w-2xl mx-auto font-sans-elegant">
            Where classical artistic principles meet cutting-edge financial technology, 
            creating experiences that are both intellectually profound and intuitively human.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {principles.map((principle, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="text-center group"
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-renaissance-gold/10 rounded-full flex items-center justify-center group-hover:bg-renaissance-gold/20 lyrical-transition">
                <span className="text-3xl text-renaissance-gold">{principle.symbol}</span>
              </div>
              <h3 className="text-xl font-serif-elegant text-renaissance-brown mb-4">
                {principle.title}
              </h3>
              <p className="text-renaissance-blue font-sans-elegant leading-relaxed">
                {principle.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1.2 }}
          className="text-center"
        >
          <h3 className="text-2xl font-serif-elegant text-renaissance-brown mb-8">
            Data as Art: The Golden Spiral
          </h3>
          <DataVisualization type="spiral" className="mx-auto" />
          <p className="text-sm text-renaissance-blue/70 font-sans-elegant italic mt-4 max-w-md mx-auto">
            Like Fibonacci's spiral in nature, our data visualizations follow divine proportions, 
            making complex information both beautiful and intuitive.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default PhilosophyPreview