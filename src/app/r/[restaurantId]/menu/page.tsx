import RestaurantMenuPage from '@/components/RestaurantMenuPage';

interface MenuPageProps {
  params: {
    restaurantId: string;
  };
}

export default function MenuPage({ params }: MenuPageProps) {
  const { restaurantId } = params;

  return <RestaurantMenuPage restaurantId={restaurantId} />;
}
