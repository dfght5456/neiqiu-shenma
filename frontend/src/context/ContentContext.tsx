import { createContext, useContext, useState, useEffect } from 'react';
import type React from 'react';
import type { ReactNode } from 'react';
import { get, set } from 'idb-keyval';

// Define types for content
interface ContentState {
  introduction: {
    title: string;
    subtitle: string;
    mainImage: string;
    cards: {
      definition: { title: string; content: string };
      location: { title: string; content: string };
      features: { title: string; items: string[] };
    };
  };
  overview: {
    cards: Array<{
      id: number;
      title: string;
      image: string;
      path: string;
    }>;
  };
  origins: {
    title: string;
    subtitle: string;
    stages: Array<{
      id: number;
      period: string;
      title: string;
      desc: string;
      image: string;
      themeColor: string;
    }>;
  };
  process: {
    title: string;
    subtitle: string;
    steps: Array<{
      title: string;
      description: string;
      image: string;
    }>;
  };
  colors: {
    title: string;
    subtitle: string;
    palette: Array<{
      id: number;
      name: string;
      hex: string;
      pinyin: string;
      desc: string;
    }>;
    mainImage: string;
    description: {
      title: string;
      paragraphs: string[];
    };
  };
  patterns: {
    title: string;
    subtitle: string;
    items: Array<{
      id: number;
      name: string;
      desc: string;
      image: string;
    }>;
  };
  modern: {
    hero: {
      title: string;
      subtitle: string;
      bgImage: string;
    };
    sections: Array<{
      id: string;
      title: string;
      contentTitle: string;
      content: string;
      image: string;
      tags?: string[];
      quote?: string;
    }>;
  };
  about: {
    title: string;
    description: string;
    team: {
      content: string;
      tags: string[];
    };
    thanks: string;
  };
  header: {
    cards: Array<{
      id: number;
      title: string;
      image: string;
      path: string;
    }>;
  };
}

const defaultContent: ContentState = {
  introduction: {
    title: '何为内丘神码',
    subtitle: '中国民间艺术的“活化石”',
    mainImage: '/uploads/img2.jpg',
    cards: {
      definition: {
        title: '定义',
        content: '内丘神码（Paper Horse），俗称“神灵码”或“纸马”，是流传于河北省内丘县的一种古老民间木刻版画。它是人们在春节、祭祀等特定节日里，用于供奉、祭拜神灵的纸质载体，寄托了百姓祈福避灾、五谷丰登的美好愿望。'
      },
      location: {
        title: '地理位置',
        content: '主要流传于河北省邢台市内丘县及其周边的太行山脉地区。这里自古便是神医扁鹊的封地，历史悠久，民风淳朴，保留了大量原生态的传统文化习俗，为神码的传承提供了丰厚的土壤。'
      },
      features: {
        title: '艺术特点',
        items: [
          '古朴粗犷：线条简练有力，不拘泥于解剖比例，造型夸张生动。',
          '种类繁多：涵盖天神、地祇、人鬼、物灵等，构建了完整的民间神谱。',
          '原汁原味：保留了汉唐以来的版画遗风，极具人类学与民俗学价值。'
        ]
      }
    }
  },
  overview: {
    cards: [
      {
        id: 1,
        title: '何为内丘神码',
        image: '/uploads/img1.jpg',
        path: '/introduction'
      },
      {
        id: 2,
        title: '神码的起源与发展',
        image: '/uploads/img2.jpg',
        path: '/origins'
      },
      {
        id: 3,
        title: '神码的制作过程',
        image: '/uploads/img3.jpg',
        path: '/process'
      },
      {
        id: 4,
        title: '颜色搭配和风格',
        image: '/uploads/img4.jpg',
        path: '/colors'
      },
      {
        id: 5,
        title: '神码的多种纹样',
        image: '/uploads/img5.jpg',
        path: '/patterns'
      },
      {
        id: 6,
        title: '当代传承',
        image: '/uploads/img6.jpg',
        path: '/modern-inheritance'
      }
    ]
  },
  origins: {
    title: '神码的起源与发展',
    subtitle: '一部刻在纸上的民间信仰史',
    stages: [
      {
        id: 1,
        period: '源起 · 汉唐',
        title: '纸马之源，汉唐遗风',
        desc: '内丘神码的起源可追溯至中国造纸术与雕版印刷术的发明。古人以纸为币，以木刻像，代替太牢巨典，用于祭祀天地神祇。这种古老的信仰载体，保留了汉唐时期木刻版画粗犷、古朴的艺术风格，被誉为中国民间艺术的“活化石”。',
        image: '/uploads/img3.jpg',
        themeColor: '#8d6e63'
      },
      {
        id: 2,
        period: '鼎盛 · 明清',
        title: '家家户户，香火繁盛',
        desc: '明清时期，随着内丘扁鹊庙会等民间活动的兴盛，神码艺术达到顶峰。内丘及其周边的纸马铺林立，神码种类丰富，涵盖了从天神地祇到家宅六畜的方方面面。每逢年节，百姓争相请购，寄托着对美好生活的祈愿。',
        image: '/uploads/img4.jpg',
        themeColor: '#b71c1c'
      },
      {
        id: 3,
        period: '沉寂 · 近代',
        title: '时代变迁，遗存散落',
        desc: '随着近现代社会的剧烈变革与破除迷信运动，神码的生存空间遭到挤压。大量珍贵的老刻版散失或被毁，传承人老去，这门古老的手艺一度面临失传的危机，如同风中残烛，在太行山深处默默坚守。',
        image: '/uploads/img5.jpg',
        themeColor: '#616161'
      },
      {
        id: 4,
        period: '新生 · 当代',
        title: '非遗保护，薪火相传',
        desc: '进入新世纪，内丘神码被列入河北省非物质文化遗产名录。在政府与文化学者的推动下，抢救性挖掘工作全面展开。新一代传承人接过刻刀，不仅复刻经典，更尝试将神码元素融入现代文创，让古老神码焕发出新的生命力。',
        image: '/uploads/img6.jpg',
        themeColor: '#d32f2f'
      }
    ]
  },
  process: {
    title: '神码制作工艺',
    subtitle: '七道工序，匠心独运',
    steps: [
      {
        title: '第一步：选材',
        description: '选用质地坚硬、纹理细腻的梨木或枣木作为版材，确保经久耐用且易于受墨。',
        image: '/uploads/img1.jpg'
      },
      {
        title: '第二步：制版',
        description: '将木材刨平、打磨，并在表面涂上一层植物油，使其光滑平整，便于后续雕刻。',
        image: '/uploads/img2.jpg'
      },
      {
        title: '第三步：画稿',
        description: '画师在薄纸上勾勒出神像的轮廓线条，讲究“线如铁丝，力透纸背”。',
        image: '/uploads/img3.jpg'
      },
      {
        title: '第四步：贴样',
        description: '将画好的墨稿反贴于木板之上，待干燥后，用湿布轻擦，显露出清晰的墨迹。',
        image: '/uploads/img4.jpg'
      },
      {
        title: '第五步：雕刻',
        description: '艺人手持刻刀，依墨线运刀，先刻轮廓，再刻细部，讲究“陡刀立线”，线条挺拔。',
        image: '/uploads/img5.jpg'
      },
      {
        title: '第六步：印刷',
        description: '用棕刷蘸取特制墨汁均匀涂于版面，覆上宣纸，用趟子（平刷）轻轻拓印。',
        image: '/uploads/img6.jpg'
      },
      {
        title: '第七步：晾晒',
        description: '将印好的神码揭下，置于阴凉通风处晾干，切忌暴晒，以免纸张变形或墨色褪变。',
        image: '/uploads/img7.jpg'
      }
    ]
  },
  colors: {
    title: '色彩美学',
    subtitle: '五色交辉，神韵天成',
    palette: [
      {
        id: 1,
        name: '朱砂红',
        hex: '#c62828',
        pinyin: 'Zhu Sha Hong',
        desc: '象征喜庆与辟邪，是神码中最核心的主色调，寓意红红火火。'
      },
      {
        id: 2,
        name: '槐黄',
        hex: '#f9a825',
        pinyin: 'Huai Huang',
        desc: '象征土地与尊贵，代表五谷丰登，常用于神像服饰或背景。'
      },
      {
        id: 3,
        name: '石青',
        hex: '#1565c0',
        pinyin: 'Shi Qing',
        desc: '象征庄重与威严，多用于武将神祇的盔甲或装饰，沉稳大气。'
      },
      {
        id: 4,
        name: '松绿',
        hex: '#2e7d32',
        pinyin: 'Song Lv',
        desc: '象征生机与活力，点缀于画面之中，增添了一份自然的灵动。'
      }
    ],
    mainImage: '/uploads/img4.jpg',
    description: {
      title: '民间审美的极致表达',
      paragraphs: [
        '内丘神码的色彩运用，继承了中国传统民间美术“五色观”的精髓。在色彩搭配上，画师们遵循“红红绿绿，图个吉利”的朴素审美，虽然用色种类不多，通常仅以红、黄、绿、紫（或蓝）几色套印，但通过高纯度色彩的强烈对比，营造出一种热烈、浓郁、饱满的视觉效果。',
        '这种“大俗大雅”的色彩风格，不仅增强了画面的装饰性与冲击力，更深刻地契合了劳动人民祈求风调雨顺、家宅平安的心理诉求，让每一张神码都成为承载着美好愿景的艺术结晶。'
      ]
    }
  },
  patterns: {
    title: '神码的多种纹样',
    subtitle: '方寸之间的艺术语言',
    items: [
      {
        id: 1,
        name: '祥云纹',
        desc: '寓意吉祥如意，常用于神像背景或脚下，象征神灵降临，云气缭绕的仙境。',
        image: '/uploads/img1.jpg'
      },
      {
        id: 2,
        name: '回纹',
        desc: '连绵不断，寓意富贵不断头，常作为边框装饰，增添画面的庄重感与秩序感。',
        image: '/uploads/img2.jpg'
      },
      {
        id: 3,
        name: '水波纹',
        desc: '象征财源滚滚、上善若水，多见于与水神、龙王相关的神码中。',
        image: '/uploads/img3.jpg'
      },
      {
        id: 4,
        name: '牡丹纹',
        desc: '花开富贵，象征繁荣昌盛，常装饰于女性神祇或喜庆题材的画面中。',
        image: '/uploads/img4.jpg'
      },
      {
        id: 5,
        name: '缠枝纹',
        desc: '结构连绵，生生不息，寓意子孙万代、长盛不衰，线条优美流畅。',
        image: '/uploads/img5.jpg'
      },
      {
        id: 6,
        name: '瑞兽纹',
        desc: '如龙、凤、麒麟等，象征祥瑞与守护，常作为神座或护法出现。',
        image: '/uploads/img6.jpg'
      }
    ]
  },
  modern: {
    hero: {
      title: '当代传承',
      subtitle: '守正创新 · 薪火相传',
      bgImage: '/uploads/img1.jpg'
    },
    sections: [
      {
        id: 'inheritors',
        title: '代表性传人',
        contentTitle: '魏老师：内丘神码的守护者',
        content: '作为内丘神码的当代代表性传承人，魏老师自幼受家庭熏陶，酷爱民间艺术。他不仅完整继承了神码的传统刻印技艺，更致力于对散落在民间的古老画版进行搜集与整理。几十年来，他走遍太行山区的村村寨寨，抢救了大量珍贵的文化遗产。',
        quote: '“神码不仅是画，更是心。每一刀下去，都是对祖先智慧的致敬。”',
        image: '/uploads/img3.jpg',
        tags: ['非遗传承人', '民间工艺大师']
      },
      {
        id: 'protection',
        title: '非遗保护',
        contentTitle: '国家级重视，抢救性保护',
        content: '近年来，内丘神码的文化价值日益受到重视。它不仅被列入河北省省级非物质文化遗产名录，更在当地政府的推动下，建立了专门的神码艺术博物馆与传习所。通过数字化建档、口述历史记录等方式，将这一古老技艺完整地保存下来。',
        image: '/uploads/img1.jpg',
        tags: ['省级非遗', '活态传承', '数字化建档']
      },
      {
        id: 'creative',
        title: '文创开发',
        contentTitle: '老树发新芽，融入现代生活',
        content: '为了让神码艺术走进年轻人的视野，传承人们尝试将传统纹样进行现代设计转化。手机壳、帆布袋、装饰画、书签……一系列兼具实用性与审美价值的文创产品应运而生。古老的神码不再只是祭祀用品，更成为了国潮文化的时尚符号。',
        image: '/uploads/img6.jpg'
      }
    ]
  },
  about: {
    title: '内丘神码数字化展示平台',
    description: '致力于保护与传承国家级非物质文化遗产“内丘神码”，通过数字化手段，让古老的民间艺术焕发新生，让更多人了解、喜爱并传承这一宝贵的文化财富。',
    team: {
      content: '我们是一群热爱传统文化的年轻开发者与设计师。本项目旨在探索“科技+非遗”的融合创新模式，用代码编织文化的经纬，用设计重现历史的色彩。',
      tags: ['React', 'TypeScript', 'Framer Motion', 'Ant Design Mobile']
    },
    thanks: '感谢内丘县文化广电和旅游局提供的学术支持，感谢魏老师等非遗传承人的悉心指导，以及所有关注和支持民间艺术传承的朋友们。'
  },
  header: {
    cards: [
      { id: 1, title: '何为内丘神码', image: '/uploads/img1.jpg', path: '/introduction' },
      { id: 2, title: '神码的起源与发展', image: '/uploads/img2.jpg', path: '/origins' },
      { id: 3, title: '神码的制作过程', image: '/uploads/img3.jpg', path: '/process' },
      { id: 4, title: '颜色搭配和风格', image: '/uploads/img4.jpg', path: '/colors' },
      { id: 5, title: '神码的多种纹样', image: '/uploads/img5.jpg', path: '/patterns' },
      { id: 6, title: '当代传承', image: '/uploads/img6.jpg', path: '/modern-inheritance' }
    ]
  }
};

interface ContentContextType {
  content: ContentState;
  updateContent: (section: keyof ContentState, data: any) => void;
  resetContent: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<ContentState>(defaultContent);

  useEffect(() => {
    // 1. Try to load from /content.json (build/production or local dev synced file)
    const loadContent = async () => {
      try {
        const response = await fetch('/content.json');
        if (response.ok) {
          const data = await response.json();
          setContent(prev => ({ ...prev, ...data }));
          // Sync to IndexedDB for offline support or faster subsequent loads
          await set('site_content', data);
        } else {
          // 2. Fallback to IndexedDB
          const saved = await get('site_content');
          if (saved) {
             const parsed = typeof saved === 'string' ? JSON.parse(saved) : saved;
             setContent(prev => ({ ...prev, ...parsed }));
          }
        }
      } catch (e) {
        console.error('Failed to load content', e);
        // Fallback to IndexedDB
        const saved = await get('site_content');
        if (saved) {
           const parsed = typeof saved === 'string' ? JSON.parse(saved) : saved;
           setContent(prev => ({ ...prev, ...parsed }));
        }
      }
    };
    loadContent();
  }, []);

  const updateContent = async (section: keyof ContentState, data: any) => {
    // 1. Calculate new state
    const newContent = { ...content, [section]: { ...content[section], ...data } };
    
    // 2. Update local state
    setContent(newContent);

    // 3. Save to IndexedDB
    try {
      await set('site_content', newContent);
    } catch (e) {
      console.error('Save to DB failed', e);
    }

    // 4. Try to save to local dev server (if running)
    try {
      if (import.meta.env.DEV) {
        await fetch('/api/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newContent)
        });
      }
    } catch (e) {
      console.warn('Dev server save failed (ignore in production)', e);
    }
  };


  const resetContent = () => {
    setContent(defaultContent);
    set('site_content', null); // Clear from DB
    localStorage.removeItem('site_content');
  };

  return (
    <ContentContext.Provider value={{ content, updateContent, resetContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
