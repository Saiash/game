import { Tag } from '../../../../core/managers/tag/models/tag';

type Props = {
  data: { [index: string]: { [index: string]: Tag } };
  onTypeSelect: (event: any) => any;
  onIdSelect: (event: any) => any;
  addEntity: (event: any) => any;
  selectedId: string;
  selectedType: string;
};

export function TypeSelector(props: Props) {
  const {
    data,
    selectedType,
    selectedId,
    onTypeSelect,
    onIdSelect,
    addEntity,
  } = props;

  const types = Object.keys(data).filter(s => s !== 'nodes');

  const ids = selectedType ? Object.keys(data[selectedType]) : [];

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        width: 200,
        border: '1px solid black',
        paddingTop: 10,
        paddingLeft: 10,
        overflow: 'scroll',
      }}
    >
      {types.map(type => {
        return (
          <div style={{ marginBottom: 10 }} key={type}>
            <div>
              <span
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  onTypeSelect(type);
                }}
              >
                {type[0].toUpperCase() + type.substring(1)}
              </span>
              <span
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  addEntity(type);
                }}
              >
                {' '}
                +{' '}
              </span>
            </div>
            {selectedType === type &&
              ids.map(id => {
                return (
                  <div key={id} style={{ marginLeft: 15, marginTop: 5 }}>
                    <div
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        onIdSelect(id);
                      }}
                    >
                      {id[0].toUpperCase() + id.substring(1)}
                    </div>
                  </div>
                );
              })}
          </div>
        );
      })}
    </div>
  );
}
