export default function Post() {
  return (
    <div className="post">
      <div className="image">
        <img src="https://images.unsplash.com/photo-1715313200229-0326e4fd2e5e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></img>
      </div>
      <div className="texts">
        <h2>Some of the best chinese architecture</h2>
        <p className="info">
          <a className="author">Nick</a>
          <time>2024-05-21 17:58</time>
        </p>
        <p className="summary">youve never seen this before...</p>
      </div>
    </div>
  );
}
