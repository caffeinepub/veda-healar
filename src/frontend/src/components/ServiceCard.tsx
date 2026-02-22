import { Link } from '@tanstack/react-router';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface ServiceCardProps {
  id: string;
  name: string;
  icon: string;
  description: string;
  price: string;
  delay?: number;
}

export default function ServiceCard({
  id,
  name,
  icon,
  description,
  price,
  delay = 0,
}: ServiceCardProps) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`bg-white rounded-lg shadow-lg p-8 hover:shadow-2xl transition-all duration-500 hover:scale-105 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-goldAccent/10 p-4 flex items-center justify-center">
        <img src={icon} alt={name} className="w-full h-full object-contain" />
      </div>
      <h3 className="font-serif text-2xl font-bold text-deepBlue text-center mb-4">
        {name}
      </h3>
      <p className="text-gray-700 text-center leading-relaxed mb-6">
        {description}
      </p>
      <div className="text-center mb-6">
        <p className="text-goldAccent font-semibold text-lg">{price}</p>
      </div>
      <Link
        to="/book"
        search={{ service: id }}
        className="block w-full bg-goldAccent text-white px-6 py-3 rounded-lg font-semibold text-center hover:bg-goldAccent/90 transition-all duration-300 hover:scale-105 shadow-md"
      >
        Book Now
      </Link>
    </div>
  );
}
