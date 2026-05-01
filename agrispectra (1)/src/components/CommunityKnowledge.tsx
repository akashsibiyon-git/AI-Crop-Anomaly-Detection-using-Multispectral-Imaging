import React from 'react';
import { 
  Users, MessageSquare, ThumbsUp, Share2, 
  Search, Filter, Plus, User, Clock, Tag 
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const CommunityKnowledge: React.FC = () => {
  const { t } = useLanguage();

  const posts = [
    { 
      id: 'P-001', 
      user: 'Arun Kumar', 
      role: 'Organic Farmer', 
      title: 'Managing Fungal Infection in High Humidity', 
      content: 'I have noticed a sudden increase in fungal stress in the Southwest sector. Using organic neem oil spray has helped reduce the spread significantly. Has anyone else tried this?', 
      likes: 24, 
      replies: 8, 
      tags: ['Fungal', 'Organic', 'Tamil Nadu'], 
      time: '2 hours ago' 
    },
    { 
      id: 'P-002', 
      user: 'Priya Sharma', 
      role: 'Agri-Expert', 
      title: 'Optimal Nitrogen Levels for Rice Cultivation', 
      content: 'Maintaining a steady nitrogen level is crucial for the growth stage. I recommend a split application of urea at 20, 40, and 60 days after transplanting.', 
      likes: 45, 
      replies: 12, 
      tags: ['Rice', 'Fertilizer', 'Expert Tip'], 
      time: '5 hours ago' 
    },
    { 
      id: 'P-003', 
      user: 'Suresh Raina', 
      role: 'Commercial Farmer', 
      title: 'Irrigation Efficiency in Drought Conditions', 
      content: 'Drip irrigation has saved me nearly 30% on water costs this season. The AgriSpectra moisture sensors are key to knowing exactly when to water.', 
      likes: 18, 
      replies: 5, 
      tags: ['Irrigation', 'Water Saving', 'Tech'], 
      time: '1 day ago' 
    },
  ];

  return (
    <div className="max-w-[1600px] mx-auto p-4 md:p-8 space-y-8">
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{t('nav.community')}</h2>
              <p className="text-sm text-gray-500">Connect with other farmers and share agricultural knowledge</p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl text-sm font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-100">
            <Plus className="w-4 h-4" />
            New Post
          </button>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search knowledge base..." 
                className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-600 rounded-xl text-sm font-bold hover:bg-gray-100 transition-all">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-400 font-bold uppercase tracking-wider">
            <span className="text-green-600">Trending</span>
            <span>Recent</span>
            <span>Unanswered</span>
          </div>
        </div>

        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="p-6 rounded-3xl border border-gray-100 hover:border-green-200 transition-all group cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">{post.user}</h4>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">{post.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  <Clock className="w-3 h-3" />
                  {post.time}
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">{post.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">{post.content}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag, i) => (
                  <span key={i} className="flex items-center gap-1 text-[10px] font-bold px-2 py-1 bg-gray-50 text-gray-500 rounded-full uppercase tracking-wider">
                    <Tag className="w-2 h-2" />
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-6 pt-4 border-t border-gray-50">
                <button className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-green-600 transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                  {post.likes}
                </button>
                <button className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-blue-600 transition-colors">
                  <MessageSquare className="w-4 h-4" />
                  {post.replies}
                </button>
                <button className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-purple-600 transition-colors ml-auto">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityKnowledge;
