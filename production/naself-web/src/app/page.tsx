import { DEFAULT_COLORS } from '@/components/common/colors';
import { ListItem } from '@/components/files/list/list-item';

export default function Home() {
  return (
    <main>
      <h1>Home</h1>
      <ul style={{ margin: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
        <ListItem
          name='very long naaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaame'
          owner='You'
          modified={new Date('2023-11-05')}
          type='folder'
        />
        <ListItem
          name='Design'
          owner='You'
          modified={new Date('2023-11-05')}
          type='folder'
          color={DEFAULT_COLORS[0]}
        />
        <ListItem
          name='Projects'
          owner='You'
          modified={new Date('2023-11-05')}
          type='folder'
          isShared
          color={DEFAULT_COLORS[1]}
        />
        <ListItem
          name='Folder (1)'
          owner='You'
          modified={new Date('2022-11-05')}
          type='folder'
          color={DEFAULT_COLORS[2]}
        />
        <ListItem
          name='Fodler (2)'
          owner='You'
          modified={new Date('2023-01-05')}
          type='folder'
          color={DEFAULT_COLORS[3]}
        />
        <ListItem
          name='Movies'
          owner='You'
          modified={new Date('2023-05-05')}
          type='folder'
          color={DEFAULT_COLORS[4]}
        />
        <ListItem
          name='Cartoons'
          owner='You'
          modified={new Date('2023-11-05')}
          type='folder'
          color={DEFAULT_COLORS[5]}
          selected
        />
        <ListItem
          name='Oop'
          owner='You'
          modified={new Date('2022-01-15')}
          type='folder'
          color={DEFAULT_COLORS[6]}
          selected
        />
        <ListItem
          name='Kastet'
          owner='You'
          modified={new Date('2023-11-05')}
          type='folder'
          color={DEFAULT_COLORS[7]}
        />
        <ListItem
          name='Design.pdf'
          owner='You'
          modified={new Date('2023-11-05')}
          type='file'
        />
        <ListItem
          name='README.md'
          owner='You'
          modified={new Date('2023-11-05')}
          type='file'
        />
      </ul>
    </main>
  );
}
