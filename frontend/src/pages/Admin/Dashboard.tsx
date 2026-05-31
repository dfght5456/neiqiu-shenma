import React from 'react';
import { Tabs, Form, Input, TextArea, Button, Toast, ImageUploader, Dialog, Collapse } from 'antd-mobile';
import { useContent } from '../../context/ContentContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

type ImageUploadItem = { url: string; thumbnailUrl?: string; extra?: any };

const AdminDashboard: React.FC = () => {
  const { content, updateContent, resetContent } = useContent();
  const { logout } = useAuth();
  const navigate = useNavigate();


  const handleUpload = async (file: File): Promise<ImageUploadItem> => {
    try {
      // Development mode: upload to local server
      if (import.meta.env.DEV) {
        const formData = new FormData();
        formData.append('file', file);
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        if (!response.ok) throw new Error('Upload failed');
        const data = await response.json();
        return { url: data.url };
      } 
      // Production mode: use Base64 (or implement server-side upload if backend exists)
      else {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve({ url: e.target?.result as string });
          reader.onerror = (e) => {
            console.error('File read failed:', e);
            Toast.show({ content: '图片读取失败', icon: 'fail' });
            reject(e);
          };
          reader.readAsDataURL(file);
        });
      }
    } catch (e) {
      console.error('Upload failed:', e);
      Toast.show({ content: '上传失败', icon: 'fail' });
      return { url: '' };
    }
  };

  const handleLogout = () => {
    Dialog.confirm({
      content: '确定要退出登录吗？',
      onConfirm: () => {
        logout();
        navigate('/');
      },
    });
  };

  const handleReset = () => {
    Dialog.confirm({
      content: '确定要重置所有内容为默认值吗？这将清除所有修改。',
      onConfirm: () => {
        resetContent();
        window.location.reload();
      },
    });
  };

  // --- Form Handlers ---

  const onFinishOverview = async (values: any) => {
    const newCards = content.overview.cards.map((card, index) => ({
      ...card,
      image: values[`image_${index}`]?.[0]?.url || card.image,
      title: values[`title_${index}`] || card.title,
    }));

    await updateContent('overview', { cards: newCards });
    Toast.show({
      content: '保存成功',
      icon: 'success',
    });
  };

  const onFinishIntro = async (values: any) => {
    const mainImage = values.mainImage?.[0]?.url || content.introduction.mainImage;
    const newIntro = {
      ...content.introduction,
      title: values.title,
      subtitle: values.subtitle,
      mainImage: mainImage,
      cards: {
        definition: { title: values.defTitle, content: values.defContent },
        location: { title: values.locTitle, content: values.locContent },
        features: { 
          title: values.featTitle, 
          items: values.featItems.split('\n').filter((i: string) => i.trim()) 
        }
      }
    };
    await updateContent('introduction', newIntro);
    Toast.show({
      content: '保存成功',
      icon: 'success',
    });
  };

  const onFinishOrigins = async (values: any) => {
    const newStages = content.origins.stages.map((stage, index) => ({
      ...stage,
      title: values[`title_${index}`],
      desc: values[`desc_${index}`],
      image: values[`image_${index}`]?.[0]?.url || stage.image,
    }));

    await updateContent('origins', {
      title: values.pageTitle,
      subtitle: values.pageSubtitle,
      stages: newStages
    });
    Toast.show({
      content: '保存成功',
      icon: 'success',
    });
  };

  const onFinishProcess = async (values: any) => {
    const newSteps = content.process.steps.map((step, index) => ({
      ...step,
      title: values[`title_${index}`],
      description: values[`desc_${index}`],
      image: values[`image_${index}`]?.[0]?.url || step.image,
    }));

    await updateContent('process', {
      title: values.pageTitle,
      subtitle: values.pageSubtitle,
      steps: newSteps
    });
    Toast.show({
      content: '保存成功',
      icon: 'success',
    });
  };

  const onFinishColors = async (values: any) => {
    const newPalette = content.colors.palette.map((item, index) => ({
      ...item,
      name: values[`name_${index}`],
      desc: values[`desc_${index}`],
      hex: values[`hex_${index}`],
    }));

    await updateContent('colors', {
      title: values.pageTitle,
      subtitle: values.pageSubtitle,
      mainImage: values.mainImage?.[0]?.url || content.colors.mainImage,
      palette: newPalette,
      description: {
        title: values.descTitle,
        paragraphs: values.descParagraphs.split('\n\n').filter((p: string) => p.trim())
      }
    });
    Toast.show({
      content: '保存成功',
      icon: 'success',
    });
  };

  const onFinishPatterns = async (values: any) => {
    const newItems = content.patterns.items.map((item, index) => ({
      ...item,
      name: values[`name_${index}`],
      desc: values[`desc_${index}`],
      image: values[`image_${index}`]?.[0]?.url || item.image,
    }));

    await updateContent('patterns', {
      title: values.pageTitle,
      subtitle: values.pageSubtitle,
      items: newItems
    });
    Toast.show({
      content: '保存成功',
      icon: 'success',
    });
  };

  const onFinishModern = async (values: any) => {
    const newSections = content.modern.sections.map((section, index) => ({
      ...section,
      title: values[`title_${index}`],
      contentTitle: values[`contentTitle_${index}`],
      content: values[`content_${index}`],
      quote: values[`quote_${index}`],
      image: values[`image_${index}`]?.[0]?.url || section.image,
    }));

    await updateContent('modern', {
      hero: {
        ...content.modern.hero,
        title: values.heroTitle,
        subtitle: values.heroSubtitle,
        bgImage: values.heroImage?.[0]?.url || content.modern.hero.bgImage
      },
      sections: newSections
    });
    Toast.show({
      content: '保存成功',
      icon: 'success',
    });
  };

  const onFinishAbout = async (values: any) => {
    await updateContent('about', {
      title: values.title,
      description: values.description,
      team: {
        content: values.teamContent,
        tags: values.teamTags.split(',').map((t: string) => t.trim())
      },
      thanks: values.thanks
    });
    Toast.show({
      content: '保存成功',
      icon: 'success',
    });
  };

  return (
    <div style={{ padding: '20px', minHeight: '100vh', background: '#f5f5f5' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>后台内容管理</h2>
        <div>
          <Button size='small' color='danger' fill='outline' onClick={handleReset} style={{ marginRight: '10px' }}>重置内容</Button>
          <Button size='small' onClick={handleLogout}>退出</Button>
        </div>
      </div>

      <Tabs>
        <Tabs.Tab title='首页概览' key='overview'>
          <Form layout='horizontal' onFinish={onFinishOverview}
            initialValues={{
              ...content.overview.cards.reduce((acc, card, index) => ({
                ...acc,
                [`title_${index}`]: card.title,
                [`image_${index}`]: [{ url: card.image }]
              }), {})
            }}
            footer={<Button block type='submit' color='primary' size='large'>保存修改</Button>}
          >
            <Form.Header>概览卡片</Form.Header>
            {content.overview.cards.map((card, index) => (
              <Collapse key={card.id} defaultActiveKey={['0']}>
                <Collapse.Panel key={`${index}`} title={card.title}>
                  <Form.Item name={`title_${index}`} label='标题'><Input /></Form.Item>
                  <Form.Item name={`image_${index}`} label='卡片图片'>
                    <ImageUploader upload={handleUpload} maxCount={1} />
                  </Form.Item>
                </Collapse.Panel>
              </Collapse>
            ))}
          </Form>
        </Tabs.Tab>

        <Tabs.Tab title='何为神码' key='introduction'>
          <Form layout='horizontal' onFinish={onFinishIntro}
            initialValues={{
              title: content.introduction.title,
              subtitle: content.introduction.subtitle,
              mainImage: [{ url: content.introduction.mainImage }],
              defTitle: content.introduction.cards.definition.title,
              defContent: content.introduction.cards.definition.content,
              locTitle: content.introduction.cards.location.title,
              locContent: content.introduction.cards.location.content,
              featTitle: content.introduction.cards.features.title,
              featItems: content.introduction.cards.features.items.join('\n')
            }}
            footer={<Button block type='submit' color='primary' size='large'>保存修改</Button>}
          >
            <Form.Header>页面标题</Form.Header>
            <Form.Item name='title' label='主标题'><Input /></Form.Item>
            <Form.Item name='subtitle' label='副标题'><Input /></Form.Item>
            <Form.Item name='mainImage' label='主图'>
              <ImageUploader upload={handleUpload} maxCount={1} />
            </Form.Item>
            <Form.Header>内容卡片</Form.Header>
            <Form.Item name='defTitle' label='定义标题'><Input /></Form.Item>
            <Form.Item name='defContent' label='定义内容'><TextArea autoSize /></Form.Item>
            <Form.Item name='locTitle' label='位置标题'><Input /></Form.Item>
            <Form.Item name='locContent' label='位置内容'><TextArea autoSize /></Form.Item>
            <Form.Item name='featTitle' label='特点标题'><Input /></Form.Item>
            <Form.Item name='featItems' label='特点列表(每行一个)'><TextArea autoSize /></Form.Item>
          </Form>
        </Tabs.Tab>

        <Tabs.Tab title='起源发展' key='origins'>
          <Form layout='horizontal' onFinish={onFinishOrigins}
            initialValues={{
              pageTitle: content.origins.title,
              pageSubtitle: content.origins.subtitle,
              ...content.origins.stages.reduce((acc, stage, index) => ({
                ...acc,
                [`title_${index}`]: stage.title,
                [`desc_${index}`]: stage.desc,
                [`image_${index}`]: [{ url: stage.image }]
              }), {})
            }}
            footer={<Button block type='submit' color='primary' size='large'>保存修改</Button>}
          >
            <Form.Header>页面信息</Form.Header>
            <Form.Item name='pageTitle' label='主标题'><Input /></Form.Item>
            <Form.Item name='pageSubtitle' label='副标题'><Input /></Form.Item>
            
            <Form.Header>时间线阶段</Form.Header>
            {content.origins.stages.map((stage, index) => (
              <Collapse key={stage.id} defaultActiveKey={['0']}>
                <Collapse.Panel key={`${index}`} title={`${stage.period} - ${stage.title}`}>
                  <Form.Item name={`title_${index}`} label='标题'><Input /></Form.Item>
                  <Form.Item name={`desc_${index}`} label='描述'><TextArea autoSize /></Form.Item>
                  <Form.Item name={`image_${index}`} label='图片'>
                    <ImageUploader upload={handleUpload} maxCount={1} />
                  </Form.Item>
                </Collapse.Panel>
              </Collapse>
            ))}
          </Form>
        </Tabs.Tab>

        <Tabs.Tab title='制作工艺' key='process'>
          <Form layout='horizontal' onFinish={onFinishProcess}
            initialValues={{
              pageTitle: content.process.title,
              pageSubtitle: content.process.subtitle,
              ...content.process.steps.reduce((acc, step, index) => ({
                ...acc,
                [`title_${index}`]: step.title,
                [`desc_${index}`]: step.description,
                [`image_${index}`]: [{ url: step.image }]
              }), {})
            }}
            footer={<Button block type='submit' color='primary' size='large'>保存修改</Button>}
          >
            <Form.Header>页面信息</Form.Header>
            <Form.Item name='pageTitle' label='主标题'><Input /></Form.Item>
            <Form.Item name='pageSubtitle' label='副标题'><Input /></Form.Item>
            
            <Form.Header>制作步骤</Form.Header>
            {content.process.steps.map((step, index) => (
              <Collapse key={index}>
                <Collapse.Panel key={`${index}`} title={`步骤 ${index + 1}: ${step.title}`}>
                  <Form.Item name={`title_${index}`} label='标题'><Input /></Form.Item>
                  <Form.Item name={`desc_${index}`} label='描述'><TextArea autoSize /></Form.Item>
                  <Form.Item name={`image_${index}`} label='图片'>
                    <ImageUploader upload={handleUpload} maxCount={1} />
                  </Form.Item>
                </Collapse.Panel>
              </Collapse>
            ))}
          </Form>
        </Tabs.Tab>

        <Tabs.Tab title='色彩美学' key='colors'>
          <Form layout='horizontal' onFinish={onFinishColors}
            initialValues={{
              pageTitle: content.colors.title,
              pageSubtitle: content.colors.subtitle,
              mainImage: [{ url: content.colors.mainImage }],
              descTitle: content.colors.description.title,
              descParagraphs: content.colors.description.paragraphs.join('\n\n'),
              ...content.colors.palette.reduce((acc, item, index) => ({
                ...acc,
                [`name_${index}`]: item.name,
                [`desc_${index}`]: item.desc,
                [`hex_${index}`]: item.hex,
              }), {})
            }}
            footer={<Button block type='submit' color='primary' size='large'>保存修改</Button>}
          >
            <Form.Header>页面信息</Form.Header>
            <Form.Item name='pageTitle' label='主标题'><Input /></Form.Item>
            <Form.Item name='pageSubtitle' label='副标题'><Input /></Form.Item>
            <Form.Item name='mainImage' label='主展示图'>
              <ImageUploader upload={handleUpload} maxCount={1} />
            </Form.Item>
            
            <Form.Header>色卡列表</Form.Header>
            {content.colors.palette.map((item, index) => (
              <Collapse key={item.id}>
                <Collapse.Panel key={`${index}`} title={`${item.name} (${item.hex})`}>
                  <Form.Item name={`name_${index}`} label='名称'><Input /></Form.Item>
                  <Form.Item name={`hex_${index}`} label='色值'><Input /></Form.Item>
                  <Form.Item name={`desc_${index}`} label='描述'><TextArea autoSize /></Form.Item>
                </Collapse.Panel>
              </Collapse>
            ))}

            <Form.Header>底部描述</Form.Header>
            <Form.Item name='descTitle' label='描述标题'><Input /></Form.Item>
            <Form.Item name='descParagraphs' label='描述内容(段落用空行分隔)'><TextArea autoSize rows={5} /></Form.Item>
          </Form>
        </Tabs.Tab>

        <Tabs.Tab title='多种纹样' key='patterns'>
          <Form layout='horizontal' onFinish={onFinishPatterns}
            initialValues={{
              pageTitle: content.patterns.title,
              pageSubtitle: content.patterns.subtitle,
              ...content.patterns.items.reduce((acc, item, index) => ({
                ...acc,
                [`name_${index}`]: item.name,
                [`desc_${index}`]: item.desc,
                [`image_${index}`]: [{ url: item.image }]
              }), {})
            }}
            footer={<Button block type='submit' color='primary' size='large'>保存修改</Button>}
          >
            <Form.Header>页面信息</Form.Header>
            <Form.Item name='pageTitle' label='主标题'><Input /></Form.Item>
            <Form.Item name='pageSubtitle' label='副标题'><Input /></Form.Item>
            
            <Form.Header>纹样列表</Form.Header>
            {content.patterns.items.map((item, index) => (
              <Collapse key={item.id}>
                <Collapse.Panel key={`${index}`} title={item.name}>
                  <Form.Item name={`name_${index}`} label='名称'><Input /></Form.Item>
                  <Form.Item name={`desc_${index}`} label='描述'><TextArea autoSize /></Form.Item>
                  <Form.Item name={`image_${index}`} label='图片'>
                    <ImageUploader upload={handleUpload} maxCount={1} />
                  </Form.Item>
                </Collapse.Panel>
              </Collapse>
            ))}
          </Form>
        </Tabs.Tab>

        <Tabs.Tab title='当代传承' key='modern'>
          <Form layout='horizontal' onFinish={onFinishModern}
            initialValues={{
              heroTitle: content.modern.hero.title,
              heroSubtitle: content.modern.hero.subtitle,
              heroImage: [{ url: content.modern.hero.bgImage }],
              ...content.modern.sections.reduce((acc, section, index) => ({
                ...acc,
                [`title_${index}`]: section.title,
                [`contentTitle_${index}`]: section.contentTitle,
                [`content_${index}`]: section.content,
                [`quote_${index}`]: section.quote || '',
                [`image_${index}`]: [{ url: section.image }]
              }), {})
            }}
            footer={<Button block type='submit' color='primary' size='large'>保存修改</Button>}
          >
            <Form.Header>顶部Hero</Form.Header>
            <Form.Item name='heroTitle' label='主标题'><Input /></Form.Item>
            <Form.Item name='heroSubtitle' label='副标题'><Input /></Form.Item>
            <Form.Item name='heroImage' label='背景图'>
              <ImageUploader upload={handleUpload} maxCount={1} />
            </Form.Item>
            
            <Form.Header>内容板块</Form.Header>
            {content.modern.sections.map((section, index) => (
              <Collapse key={section.id}>
                <Collapse.Panel key={`${index}`} title={section.title}>
                  <Form.Item name={`title_${index}`} label='板块标题'><Input /></Form.Item>
                  <Form.Item name={`contentTitle_${index}`} label='内容标题'><Input /></Form.Item>
                  <Form.Item name={`content_${index}`} label='正文'><TextArea autoSize /></Form.Item>
                  {section.quote !== undefined && (
                     <Form.Item name={`quote_${index}`} label='引用语'><TextArea autoSize /></Form.Item>
                  )}
                  <Form.Item name={`image_${index}`} label='配图'>
                    <ImageUploader upload={handleUpload} maxCount={1} />
                  </Form.Item>
                </Collapse.Panel>
              </Collapse>
            ))}
          </Form>
        </Tabs.Tab>

        <Tabs.Tab title='关于我们' key='about'>
           <Form layout='horizontal' onFinish={onFinishAbout}
            initialValues={{
              title: content.about.title,
              description: content.about.description,
              teamContent: content.about.team.content,
              teamTags: content.about.team.tags.join(', '),
              thanks: content.about.thanks
            }}
            footer={<Button block type='submit' color='primary' size='large'>保存修改</Button>}
          >
            <Form.Header>基本信息</Form.Header>
            <Form.Item name='title' label='项目标题'><Input /></Form.Item>
            <Form.Item name='description' label='项目描述'><TextArea autoSize /></Form.Item>
            
            <Form.Header>团队信息</Form.Header>
            <Form.Item name='teamContent' label='团队介绍'><TextArea autoSize /></Form.Item>
            <Form.Item name='teamTags' label='技术标签(逗号分隔)'><Input /></Form.Item>
            
            <Form.Header>其他</Form.Header>
            <Form.Item name='thanks' label='特别鸣谢'><TextArea autoSize /></Form.Item>
          </Form>
        </Tabs.Tab>

      </Tabs>
    </div>
  );
};

export default AdminDashboard;
