import { Card, Dialog } from "@sanity/ui";
import styled from "styled-components";

export const StyledImg = styled.img<{ $aspectRatio: number }>`
  width: 100%;
  border-radius: 3px;
  aspect-ratio: ${({ $aspectRatio }) => $aspectRatio};
  object-fit: cover;
  margin-bottom: 6px;
`;

export const StyledDialog = styled(Dialog)`
  .content {
    display: flex;
    min-height: 300px;

    img {
      max-height: 400px;
      max-width: 100%;
      margin: 0 auto;
      object-fit: contain;
    }
  }
`;

export const StyledCard = styled(Card)`
  cursor: pointer;
  position: relative;

  &:hover {
    .zoom {
      opacity: 1;
      pointer-events: auto;
    }
  }

  .zoom {
    cursor: pointer;
    position: absolute;
    top: 5px;
    right: 5px;
    padding: 0;
    margin: 0;
    background: var(--card-bg-color);
    border: 1px solid var(--card-border-color);
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s;

    svg {
      display: block;
    }
  }
`;
