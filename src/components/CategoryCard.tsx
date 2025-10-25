import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard = ({ category }: CategoryCardProps) => {
  const Icon = Icons[category.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;

  return (
    <Link to={`/projects?category=${category.slug}`}>
      <Card className="p-6 text-center hover-scale hover:border-primary/50 transition-all cursor-pointer">
        <div className="flex flex-col items-center space-y-3">
          <div className="p-4 rounded-full bg-primary/10">
            {Icon && <Icon className="h-8 w-8 text-primary" />}
          </div>
          <h3 className="font-semibold">{category.name}</h3>
        </div>
      </Card>
    </Link>
  );
};
