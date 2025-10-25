import React from 'react';

type Project = {
  _id: string;
  title: string;
  description?: string;
  storytelling?: {
    photos?: string[];
    videos?: string[];
    audios?: string[];
    story?: string;
    pitch?: string;
  };
  socialMedia?: Record<string, string>;
};

async function getProject(id: string): Promise<Project | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${id}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = await getProject(params.id);

  if (!project) return <div>Project not found</div>;

  return (
    <div style={{ padding: 24 }}>
      <h1>{project.title}</h1>
      <p>{project.description}</p>

      <section>
        <h2>Pitch</h2>
        <p>{project.storytelling?.pitch}</p>
      </section>

      <section>
        <h2>Story</h2>
        <div>{project.storytelling?.story}</div>
      </section>

      <section>
        <h2>Photos</h2>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {project.storytelling?.photos?.map((p, i) => (
            <img key={i} src={p} alt={`photo-${i}`} style={{ width: 200, height: 'auto' }} />
          ))}
        </div>
      </section>

      <section>
        <h2>Videos</h2>
        <div>
          {project.storytelling?.videos?.map((v, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <video src={v} controls style={{ maxWidth: '100%' }} />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Audios</h2>
        <div>
          {project.storytelling?.audios?.map((a, i) => (
            <div key={i}>
              <audio src={a} controls />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Redes Sociales</h2>
        <ul>
          {project.socialMedia && Object.entries(project.socialMedia).map(([k, v]) => (
            v ? (
              <li key={k}><a href={v} target="_blank" rel="noreferrer">{k}</a></li>
            ) : null
          ))}
        </ul>
      </section>
    </div>
  );
}
