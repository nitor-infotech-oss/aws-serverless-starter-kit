import logging
import uuid
import os
from dynamodb import DynamoDBRepository

_logger = logging.getLogger(name=__name__)
_logger.setLevel(os.getenv('MODE',logging.DEBUG))

class setItemIntoDB(DynamoDBRepository):
    
    # This function is use to add new item
    def resolve(self, event):
        try :
            data = event.get('arguments').get('input', None)

            if 'text' not in data:
                logging.error("Validation Failed")
                raise Exception("Couldn't create the item.")

            item = {
                'id': str(uuid.uuid1()),
                'text': data.get('text', ''),
                'description': data.get('description', ''),
                'checked': data.get('checked', '')
            }
            # write the item to the database
            Item = self.add_item(item=item)
            return Item

        except Exception as e:
            _logger.error(e)

if __name__ == "__main__":
    pass