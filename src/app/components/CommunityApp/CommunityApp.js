import React, { useState } from 'react';
import styles from './style.module.css';

const CommunityApp = () => {
  const [communities, setCommunities] = useState([]);
  const [currentCommunityIndex, setCurrentCommunityIndex] = useState(null);
  const [newCommunityName, setNewCommunityName] = useState('');
  const [newCommunityDescription, setNewCommunityDescription] = useState('');
  const [postContent, setPostContent] = useState('');
  const [file, setFile] = useState(null);

  const createCommunity = () => {
    if (!newCommunityName.trim() || !newCommunityDescription.trim()) {
      alert('Please enter both name and description for the community.');
      return;
    }

    const newCommunity = {
      name: newCommunityName,
      description: newCommunityDescription,
      posts: []
    };

    setCommunities([...communities, newCommunity]);
    setNewCommunityName('');
    setNewCommunityDescription('');
  };

  const joinCommunity = (communityIndex) => {
    setCurrentCommunityIndex(communityIndex);
  };

  const handlePostContentChange = (event) => {
    setPostContent(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const postContentToCommunity = () => {
    if (!postContent.trim()) {
      alert('Please enter some content to post.');
      return;
    }

    const newPost = {
      content: postContent,
      file: file // Attach file to the post
    };

    const updatedCommunities = [...communities];
    updatedCommunities[currentCommunityIndex].posts.push(newPost);
    setCommunities(updatedCommunities);

    setPostContent('');
    setFile(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.heading}>Community App</div>

      {/* Create Community Form */}
      <div className={styles.create}>
        Create Community
        <div>
          <input
            type="text"
            value={newCommunityName}
            onChange={(e) => setNewCommunityName(e.target.value)}
            placeholder="Enter community name"
          />
        </div>
        <div>
          <textarea
            value={newCommunityDescription}
            onChange={(e) => setNewCommunityDescription(e.target.value)}
            placeholder="Enter community description"
          />
        </div>
        <button style={{ backgroundColor: 'black', color: 'white', borderRadius: '5px', padding: '8px 16px', border: 'none' }} onClick={createCommunity}>Create Community</button>
      </div>

      {/* List of Communities */}
      <div className={styles.communities}>
        Communities
        <ul>
          {communities.map((community, index) => (
            <li key={index}>
              <button style={{ backgroundColor: 'black', color: 'white', borderRadius: '5px', padding: '8px 16px', border: 'none' }} onClick={() => joinCommunity(index)}>Join</button>
              {community.name} - {community.description}
            </li>
          ))}
        </ul>
      </div>

      {/* Current Community Posts */}
      {currentCommunityIndex !== null && (
        <div>
          <h3>{communities[currentCommunityIndex].name}</h3>
          Description: {communities[currentCommunityIndex].description}

          {/* Post Form */}
          <div>
            <textarea
              value={postContent}
              onChange={handlePostContentChange}
              placeholder="Write something..."
            />
            <input
              type="file"
              onChange={handleFileChange}
            />
            <button style={{ backgroundColor: 'black', color: 'white', borderRadius: '5px', padding: '8px 16px', border: 'none' }} onClick={postContentToCommunity}>Post</button>
          </div>

          {/* Community Posts */}
          <div>
            <h3>Posts</h3>
            <ul>
              {communities[currentCommunityIndex].posts.map((post, index) => (
                <li key={index}>
                  {post.content}
                  {post.file && <a href={URL.createObjectURL(post.file)} download={post.file.name}>Download File</a>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityApp;
