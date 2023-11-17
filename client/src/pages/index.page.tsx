import type { TaskModel } from 'commonTypesWithClient/models';
import { useAtom } from 'jotai';
import type { ChangeEvent, FormEvent } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { BasicHeader } from 'src/pages/@components/BasicHeader/BasicHeader';
import { apiClient } from 'src/utils/apiClient';
import { returnNull } from 'src/utils/returnNull';
import { userAtom, userIDAtom } from '../atoms/user';
import styles from './index.module.css';

const Home = () => {
  const [user] = useAtom(userAtom);
  // console.log('user', user);
  const [tasks, setTasks] = useState<TaskModel[]>();
  const [label, setLabel] = useState('');
  const inputLabel = (e: ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value);
  };
  const fetchTasks = async () => {
    const tasks = await apiClient.tasks.$get().catch(returnNull);

    if (tasks !== null) setTasks(tasks);
  };
  // console.log('tasks', tasks);
  const createTask = async (e: FormEvent) => {
    e.preventDefault();
    if (!label) return;

    await apiClient.tasks.post({ body: { label } }).catch(returnNull);
    setLabel('');
    await fetchTasks();
  };
  const toggleDone = async (task: TaskModel) => {
    await apiClient.tasks
      ._taskId(task.id)
      .patch({ body: { done: !task.done } })
      .catch(returnNull);
    await fetchTasks();
  };
  const deleteTask = async (task: TaskModel) => {
    await apiClient.tasks._taskId(task.id).delete().catch(returnNull);
    await fetchTasks();
  };

  useEffect(() => {
    if (!user) return;

    fetchTasks();
  }, [user]);

  const [userID] = useAtom(userIDAtom);
  const getUserID = async () => {
    if (userID === null) return;
    console.log('postUserID', userID);
    const data = await apiClient.user.$get({ query: { userId: userID } }).catch(returnNull);
    console.log('User見る', data);
    const id = data?.map((key) => key.id);
    console.log('id', id);
    const latitudes = data?.map((key) => key.latitude);
    console.log('latitudes', latitudes);
  };

  const [postData, setPostData] = useState<
    | {
        id: number;
        postTime: string;
        content: string;
        latitude: number;
        longitude: number;
        likes: number;
        userId: string;
      }[]
    | null
  >(null);

  const getPostContent = useCallback(async () => {
    if (userID === null) return;
    const data = await apiClient.post.$get({ query: { userId: userID } }).catch(returnNull);
    setPostData(data);
  }, [userID]);

  const postPostContent = useCallback(async () => {
    if (userID === null) return;
    const content = 'a';
    const latitude = 2.1;
    const longitude = 2.2;
    console.log('postpost');
    await apiClient.post.$post({ body: { content, latitude, longitude, userId: userID } });
    console.log('aaa');
  }, [userID]);

  useEffect(() => {
    getPostContent();
  }, [getPostContent, postPostContent]);

  // if (!tasks || !user) return <Loading visible />;
  if (!tasks || !user) {
    console.log('lodingを切ってるから見えない');
    return;
  }

  return (
    <>
      <BasicHeader user={user} />
      <div>
        <p>ユーザーID:{userID}</p>
        <button onClick={getUserID}>getUser</button>
        {/* <button onClick={getPostContent}>getPost</button> */}
        {postData &&
          postData.map((post) => (
            <div key={post.id}>
              <p>Content: {post.content}</p>
              <p>Time:{post.postTime}</p>
            </div>
          ))}
        <button onClick={postPostContent}>postPost</button>
      </div>

      <form style={{ textAlign: 'center', marginTop: '80px' }} onSubmit={createTask}>
        <input value={label} type="text" onChange={inputLabel} />
        <input type="submit" value="ADD" />
      </form>
      <ul className={styles.tasks}>
        {tasks.map((task) => (
          <li key={task.id}>
            <label>
              <input type="checkbox" checked={task.done} onChange={() => toggleDone(task)} />
              <span>{task.label}</span>
            </label>
            <input
              type="button"
              value="DELETE"
              className={styles.deleteBtn}
              onClick={() => deleteTask(task)}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Home;
